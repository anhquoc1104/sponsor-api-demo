import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import mongoose, { AggregateOptions, Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import {
  ACCOUNT_TYPE,
  BaseService,
  COLLECTION,
  Common,
  CONNECTION_NAME,
  ENUM_MODEL,
  ENUM_STATUS,
  ENVIROMENT_VARIABLE,
  POPULATE,
} from '@app/common';
import { IUsedPassword, IUser, User, UserDocument } from '@app/schemas';
import {
  CreateUserDTO,
  FindUserDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UpdateProfileDTO,
  UpdateUserDTO,
  UpdateUserStatusDTO,
} from 'apps/admin-service/src/modules/user/user.dto';
import {
  CacheService,
  Cryptography,
  REDIS_KEY_PATTERNS,
  throwErrorMessage,
} from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import {
  BaseAuthenticateRequestDTO,
  BaseRefreshTokenRequestDTO,
} from '@app/common/dto/base-auth.dto';
import {
  IRefreshTokenPayload,
  ITokenGenerateResponse,
} from '@app/shared/jwt/interfaces/jwt.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { EMITTER, SESSION_TYPE } from '@app/common/enums/emitter.enum';
import {
  IEmitterSessionResponse,
  ITrackingThirdTimesPassword,
  IVerifyResponse,
} from './interfaces';
import { JwtConfigStrategy } from '@app/shared/jwt/jwt.strategy';
import { SessionService } from '../session/session.service';
import { BlacklistService } from '../blacklist/blacklist.service';
import { CACHE_TTL, TOKEN_TYPE } from '@app/common/enums/jwt.enum';
import { ISession } from '@app/schemas/session.schema';
import { IBaseGetAllResult } from '@app/common/interfaces';
import { GroupService } from '../group/group.service';
import { AGGREGATE } from '@app/common/constants/schema.constant';
import { PERMISSION_FRAME } from '@app/common/constants/permission.constant';
import { MailService } from '@app/shared/mail/mail.service';
import { MAIL_SUBJECT, TEMPLATE } from '@app/common/enums/mail.enum';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  model_name = ENUM_MODEL.USER;

  constructor(
    @InjectModel(User.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<UserDocument>,
    @InjectModel(User.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<UserDocument>,
    private readonly cryptographyService: Cryptography,
    private readonly jwtStrategy: JwtConfigStrategy,
    private readonly sessionService: SessionService,
    private readonly blacklistService: BlacklistService,
    private readonly groupService: GroupService,
    private readonly mailService: MailService,
    private readonly cacheService: CacheService,
  ) {
    super(model, readModel);
  }

  async create(payload: CreateUserDTO): Promise<IUser> {
    if (
      Common.compareValues(payload.type, ACCOUNT_TYPE.ADMIN) &&
      !payload?.permissions?.length
    ) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.USER.NO_PERMISSIONS,
          i18nArgs: { attribute: 'Tài khoản' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    let orCondition: any = [
      {
        username: payload.username,
      },
    ];
    if (payload?.email) {
      orCondition = orCondition.concat([{ email: payload.email }]);
    }
    const createdUser = await this._findOne({
      $or: orCondition,
      type: payload.type,
    });
    if (createdUser) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.EXISTS,
          i18nArgs: { attribute: 'Tài khoản' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hashedPassword, salt, passwords } =
      await this._handlePasswordsInTheLastThirdTimes([], payload.password);
    const newUser: IUser = {
      username: payload.username,
      current_password: hashedPassword,
      current_salt: salt,
      type: payload.type,
      email: payload.email || null,
      used_passwords: passwords as [IUsedPassword],
      group: payload?.group || null,
      permissions: payload?.permissions?.length ? payload.permissions : [],
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    };
    return await this._create(newUser);
  }

  async authenticate(
    payload: BaseAuthenticateRequestDTO,
  ): Promise<ITokenGenerateResponse> {
    const user = await this._findOne(
      { username: payload.username },
      [],
      '+current_password +current_salt +used_passwords +status',
    );
    if (!user) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.NOT_EXIST,
          i18nArgs: { attribute: 'Tài khoản' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (Common.compareValues(user.status, ENUM_STATUS.INACTIVE)) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.USER.DEACTIVATED,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const deHashPassword = await this.cryptographyService.deHashSaltPassword(
      payload?.password,
      user?.current_salt,
    );
    if (!Common.compareValues(deHashPassword, user.current_password)) {
      throwErrorMessage(
        { error_code: ERROR_CODE.AUTH.WRONG_PASSWORD },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!Common.compareValues(user.type, payload.type)) {
      throwErrorMessage(
        { error_code: ERROR_CODE.AUTH.NOT_ALLOWED },
        HttpStatus.BAD_REQUEST,
      );
    }
    const response = await this.jwtStrategy.handleInitTokens(user);
    this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
      data: response,
      user,
      type: SESSION_TYPE.LOGIN,
    } as IEmitterSessionResponse);
    return response;
  }

  async getInformation(
    id: string,
    isSensitive: boolean = false,
  ): Promise<IUser> {
    const option = isSensitive
      ? '+current_password +current_salt +used_passwords'
      : {};
    const populates = isSensitive
      ? []
      : [
          { path: 'updated_by', select: POPULATE.USER },
          { path: 'created_by', select: POPULATE.USER },
          { path: 'group', select: POPULATE.GROUP },
        ];
    const user = await this._findById(id, populates, option);
    if (!user) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.NOT_EXIST,
          i18nArgs: { attribute: 'Tài khoản' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async findAll(query: FindUserDTO): Promise<IBaseGetAllResult> {
    const condition = this._getQueryCondition(query);
    let response = await this._getAll(
      query,
      condition,
      {},
      [
        ...Common.lookupOneField(
          COLLECTION.USER,
          'created_by',
          AGGREGATE.USER,
          true,
        ),
        ...Common.lookupOneField(
          COLLECTION.USER,
          'updated_by',
          AGGREGATE.USER,
          true,
        ),
        ...Common.lookupOneField(
          COLLECTION.GROUP,
          'group',
          AGGREGATE.GROUP,
          true,
        ),
        {
          $project: {
            current_salt: 0,
            current_password: 0,
            used_passwords: 0,
          },
        },
      ],
      {
        updated_at: -1,
      },
    );
    if (response?.data?.length) {
      response.data = response?.data.map((element) => {
        if (Common.compareValues(element.type, ACCOUNT_TYPE.ADMIN)) {
          element.manage_types = this._handleAdminTypes(element);
        }
        return element;
      });
    }
    return response;
  }

  async logout(response: IRefreshTokenPayload): Promise<void> {
    this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
      data: response,
      type: SESSION_TYPE.LOGOUT,
    } as IEmitterSessionResponse);
  }

  async refreshToken(
    payload: BaseRefreshTokenRequestDTO,
    value: IRefreshTokenPayload,
  ): Promise<ITokenGenerateResponse> {
    const user = await this.getInformation(value.sub);
    if (!Common.compareValues(user.type, ACCOUNT_TYPE.ADMIN)) {
      throwErrorMessage(
        { error_code: ERROR_CODE.AUTH.NOT_ALLOWED },
        HttpStatus.BAD_REQUEST,
      );
    }
    const response = await this.jwtStrategy.handleRefreshToken(user);
    this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
      type: SESSION_TYPE.REFRESH_TOKEN,
      refreshData: {
        refresh_token: payload.refresh_token,
        access_token: response.access_token,
      },
      data: value,
    } as IEmitterSessionResponse);
    return response;
  }

  async resetPassword(id: string, payload: ResetPasswordDTO): Promise<IUser> {
    const user = await this.getInformation(id, true);
    const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(
      user,
      payload.password,
    );
    if (!is_valid) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.AUTH.SAME_PASSWORD,
          i18nArgs: { attribute: message },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hashedPassword, passwords, salt } =
      await this._handlePasswordsInTheLastThirdTimes(
        user?.used_passwords,
        payload.password,
      );
    const updatedUser = await this._findByIdAndUpdate(
      id,
      {
        current_password: hashedPassword,
        current_salt: salt,
        used_passwords: passwords,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
    this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
      user,
      type: SESSION_TYPE.UPDATE_USER,
    } as IEmitterSessionResponse);
    return updatedUser;
  }

  async update(id: string, payload: UpdateUserDTO): Promise<IUser> {
    const user = await this.getInformation(id, true);
    let isBlacklist: boolean = false;
    if (Common.compareValues(user.type, ACCOUNT_TYPE.ADMIN)) {
      if (!payload?.permissions?.length) {
        throwErrorMessage(
          {
            error_code: ERROR_CODE.USER.NO_PERMISSIONS,
            i18nArgs: { attribute: 'Tài khoản' },
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const { oldArray, newArray } = Common.compareBetweenPastAndCurrent(
          user.permissions,
          payload.permissions,
        );
        isBlacklist = oldArray?.length || newArray?.length ? true : false;
      }
    }
    if (payload?.group && !Common.compareValues(payload.group, user.group)) {
      const group = await this.groupService.getInformation(payload.group);
      if (!Common.compareValues(group.type, user.type)) {
        throwErrorMessage(
          {
            error_code: ERROR_CODE.GROUP.NOT_MATCH_USER,
            i18nArgs: { attribute: group.name },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (payload?.email && !Common.compareValues(user.email, payload.email)) {
      const existedUser = await this._findOne({
        email: payload.email,
        type: user.type,
      });
      if (existedUser) {
        throwErrorMessage(
          { error_code: ERROR_CODE.USER.SAME_EMAIL },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const updatedUser = await this._findByIdAndUpdate(
      id,
      {
        permissions: payload?.permissions || [],
        email: payload?.email || null,
        group: payload?.group || null,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
    if (isBlacklist) {
      this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
        user,
        type: SESSION_TYPE.UPDATE_USER,
      } as IEmitterSessionResponse);
    }
    return updatedUser;
  }

  async forgotPassword(payload: ForgotPasswordDTO): Promise<boolean> {
    const user = await this._findOne({
      email: payload.email,
      type: payload.type,
    });
    if (!user) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.NOT_EXIST,
          i18nArgs: { attribute: 'Tài khoản' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this._resetPasswordByEmail(user);
    return true;
  }

  async verifyEmailSessionCode(code: string): Promise<IVerifyResponse> {
    const key = this.cryptographyService.encryptOrDecryptData(code, false);
    const cacheValue = await this.cacheService.get(key);
    return {
      is_expired: !cacheValue ? true : false,
      value: cacheValue,
    };
  }

  async resetPasswordByEmail(payload: ResetPasswordDTO): Promise<IUser> {
    const { is_expired, value } = await this.verifyEmailSessionCode(
      payload.code,
    );
    if (is_expired) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.AUTH.EXPIRED_VERIFY_EMAIL_SESSION,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.getInformation(value.id, true);
    const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(
      user,
      payload.password,
    );
    if (!is_valid) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.AUTH.SAME_PASSWORD,
          i18nArgs: { attribute: message },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hashedPassword, passwords, salt } =
      await this._handlePasswordsInTheLastThirdTimes(
        user?.used_passwords,
        payload.password,
      );
    const updatedUser = await this._findByIdAndUpdate(
      value.id,
      {
        current_password: hashedPassword,
        current_salt: salt,
        used_passwords: passwords,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
    const key = this.cryptographyService.encryptOrDecryptData(
      payload.code,
      false,
    );
    await this.cacheService.del(key);
    this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
      user,
      type: SESSION_TYPE.UPDATE_USER,
    } as IEmitterSessionResponse);
    await this.cacheService.del(payload.code);
    return updatedUser;
  }

  async updateProfile(id: string, payload: UpdateProfileDTO): Promise<IUser> {
    const user = await this.getInformation(id, true);
    if (payload?.email && !Common.compareValues(user.email, payload.email)) {
      const existedUser = await this._findOne({
        email: payload.email,
        type: user.type,
      });
      if (existedUser) {
        throwErrorMessage(
          { error_code: ERROR_CODE.USER.SAME_EMAIL },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const updatedUser = await this._findByIdAndUpdate(
      id,
      {
        email: payload?.email || null,
        image: payload?.image || null,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
    return updatedUser;
  }

  async updateProfilePasword(
    id: string,
    payload: ResetPasswordDTO,
  ): Promise<IUser> {
    const user = await this.getInformation(id, true);
    const { is_valid, message } = await this._checkPasswordInTheLastThirdTimes(
      user,
      payload.password,
    );
    if (!is_valid) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.AUTH.SAME_PASSWORD,
          i18nArgs: { attribute: message },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hashedPassword, passwords, salt } =
      await this._handlePasswordsInTheLastThirdTimes(
        user?.used_passwords,
        payload.password,
      );
    const updatedUser = await this._findByIdAndUpdate(
      id,
      {
        current_password: hashedPassword,
        current_salt: salt,
        used_passwords: passwords,
        updated_at: payload.updated_at,
        updated_by: payload.updated_by,
      },
      { new: true },
      [],
    );
    return updatedUser;
  }

  async updateStatus(id: string, payload: UpdateUserStatusDTO): Promise<IUser> {
    const user = await this.getInformation(id, true);
    if (Common.compareValues(payload.status, ENUM_STATUS.INACTIVE)) {
      this.eventEmitterT.emit(EMITTER.SESSION_LOGS, {
        user,
        type: SESSION_TYPE.UPDATE_USER,
      } as IEmitterSessionResponse);
    }
    return await this._findByIdAndUpdate(id, {
      updated_at: payload.updated_at,
      updated_by: payload.updated_by,
      status: payload.status,
    });
  }

  //#region PRIVATE FUNCTION
  async _handlePasswordsInTheLastThirdTimes(
    passwords: IUsedPassword[],
    password: string,
  ): Promise<{
    hashedPassword: string;
    salt: string;
    passwords: IUsedPassword[];
  }> {
    const { hashedPassword, salt } =
      await this.cryptographyService.hashSaltPassword(password);
    const lastestPassword: IUsedPassword = {
      password: hashedPassword,
      salt,
      created_at: new Date(),
    };
    passwords.push(lastestPassword);
    passwords = passwords.reverse().splice(0, 3);
    return { hashedPassword, salt, passwords };
  }

  async _handleEmitterSessions(params: IEmitterSessionResponse): Promise<{
    records: ISession[];
    user: mongoose.Types.ObjectId;
  }> {
    const user = Common.toObjectId(
      [SESSION_TYPE.LOGIN, SESSION_TYPE.UPDATE_USER].includes(params.type)
        ? params.user._id
        : (params.data as IRefreshTokenPayload).sub,
    );
    return {
      records: await this.sessionService._aggregate([
        {
          $match: {
            user,
            is_revoked: false,
          },
        },
      ]),
      user: user as mongoose.Types.ObjectId,
    };
  }

  _handleEmitterQueryOptionAndUpdatePayload(
    params: IEmitterSessionResponse,
    user: mongoose.Types.ObjectId,
  ): {
    condition: any;
    payload: any;
  } {
    const result = {
      condition: {},
      payload: {},
    };
    if (Common.compareValues(params?.type, SESSION_TYPE.REFRESH_TOKEN)) {
      const decodeAccessToken = Common.veriryExtractToken(
        params.refreshData.access_token,
      );
      result.condition = {
        refresh_token: params?.refreshData?.refresh_token,
        user,
      };
      result.payload = {
        access_token: params?.refreshData?.access_token,
        access_token_expired_at: new Date(decodeAccessToken.exp * 1000),
      };
    } else {
      result.condition = { user, is_revoked: false };
      result.payload = {
        is_revoked: true,
        revoked_at: new Date(),
        revoked_by: user,
      };
    }
    return result;
  }

  async _checkPasswordInTheLastThirdTimes(
    user: IUser,
    password: string,
  ): Promise<ITrackingThirdTimesPassword> {
    const result: ITrackingThirdTimesPassword = {
      is_valid: true,
      message: '',
    };
    for (const instance of user.used_passwords) {
      const hashedPassword = await this.cryptographyService.deHashSaltPassword(
        password,
        instance.salt,
      );
      if (Common.compareValues(hashedPassword, instance.password)) {
        result.is_valid = false;
        result.message = Common.calculateElapsedTimestamp(
          new Date(instance.created_at).getTime().toString(),
        );
        break;
      }
    }
    return result;
  }

  _getQueryCondition(query: FindUserDTO): AggregateOptions {
    let $match: AggregateOptions = { type: query.type };
    if (query?.keyword) {
      // $match.$text = Common.analysisVietNameseText(query?.keyword);
      $match.$or = [
        {
          username: new RegExp(query?.keyword, 'i'),
        },
        {
          email: new RegExp(query?.keyword, 'i'),
        },
      ];
    }
    if (query.group) {
      $match.group = Common.toObjectId(query.group);
    }
    return $match;
  }

  _handleAdminTypes(user: IUser): string[] {
    const types: string[] = [];
    PERMISSION_FRAME.map((element) => {
      const values = element.values.map((i) => i.value);
      const matches = _.intersection(values, user.permissions);
      if (matches?.length) {
        types.push(element.property);
      }
    });
    return types;
  }

  _getPortalUrlByUser(user: IUser): string {
    switch (user.type) {
      case ACCOUNT_TYPE.ADMIN:
        return this.configService.get(ENVIROMENT_VARIABLE.ADMIN_WEB_URL);
      case ACCOUNT_TYPE.CLIENT:
        return this.configService.get(ENVIROMENT_VARIABLE.CLIENT_WEB_URL);
      case ACCOUNT_TYPE.PUBLISHER:
        return this.configService.get(ENVIROMENT_VARIABLE.PUBLISHER_WEB_URL);
    }
  }
  async _resetPasswordByEmail(user: IUser): Promise<void> {
    const keyword = REDIS_KEY_PATTERNS.ACCOUNT.EMAIL_PASSWORD(user._id);
    const regexKeys = await this.cacheService.getKeysByKeyword(`*${keyword}*`);
    if (regexKeys?.length) {
      regexKeys.map(async (key) => {
        await this.cacheService.del(key);
      });
    }
    const key = REDIS_KEY_PATTERNS.ACCOUNT.EMAIL_PASSWORD(
      user._id,
      Date.now().toString(),
    );
    await this.cacheService.set(
      key,
      { id: user._id, timestamp: Date.now().toString() },
      { ttl: CACHE_TTL.EMAIL },
    );
    const session = await this.cryptographyService.encryptOrDecryptData(key);
    await this.mailService.sendMessageForUserMail({
      to: user.email,
      subject: MAIL_SUBJECT.UPDATE_PASSWORD,
      template: TEMPLATE.FORGOT_PASSWORD,
      context: {
        redirectUrl:
          this._getPortalUrlByUser(user) +
          '/reset-password' +
          `?code=${session}`,
      },
    });
  }
  //#endregion

  //#region EVENT EMIITER
  @OnEvent(EMITTER.SESSION_LOGS)
  async handleEmitterSession(params: IEmitterSessionResponse): Promise<void> {
    try {
      const { records, user } = await this._handleEmitterSessions(params);
      if (records?.length) {
        const types = Common.compareValues(
          params.type,
          SESSION_TYPE.REFRESH_TOKEN,
        )
          ? [TOKEN_TYPE.BEARER]
          : [TOKEN_TYPE.BEARER, TOKEN_TYPE.REFRESH];
        const { condition, payload } =
          this._handleEmitterQueryOptionAndUpdatePayload(params, user);
        await Promise.all([
          this.blacklistService.handleBlackListTokens(records, types),
          this.sessionService._updateMany(condition, payload),
        ]);
      }
      if (Common.compareValues(params.type, SESSION_TYPE.LOGIN)) {
        const data = params.data as ITokenGenerateResponse;
        const decodeAccessToken = Common.veriryExtractToken(data.access_token);
        const decodeRefreshToken = Common.veriryExtractToken(
          data.refresh_token,
        );
        await Promise.all([
          await this.sessionService._create({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            user: params.user._id,
            access_token_expired_at: new Date(decodeAccessToken.exp * 1000),
            refresh_token_expired_at: new Date(decodeRefreshToken.exp * 1000),
          } as ISession),
          await this._findByIdAndUpdate(user, { last_login_at: new Date() }),
        ]);
      }
    } catch (error) {
      this.logger.error(
        `ERROR:EVENT_EMIITER: handleEmitterSession=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
    }
  }
  //#endregion
}

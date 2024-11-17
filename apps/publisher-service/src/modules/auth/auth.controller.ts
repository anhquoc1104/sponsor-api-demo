import { ACCOUNT_TYPE, BaseController, RESPONSE } from '@app/common';
import { OnlyVerify, throwErrorMessage, Unprotected, User } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  BaseAuthenticateRequestDTO,
  BaseLogoutRequestDTO,
  BaseRefreshTokenRequestDTO,
} from '@app/common/dto/base-auth.dto';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { BlacklistService } from '@app/modules/blacklist/blacklist.service';
import { UserService } from '@app/modules/user/user.service';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import {
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UpdateProfileDTO,
  VerifyEmailSessionDTO,
} from 'apps/admin-service/src/modules/user/user.dto';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly blacklistService: BlacklistService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Login Authenicate Account' })
  @Unprotected(true)
  async authenticate(@Body() payload: BaseAuthenticateRequestDTO) {
    try {
      payload.type = ACCOUNT_TYPE.PUBLISHER;
      const response = await this.userService.authenticate(payload);
      return await this.returnResponse(response, RESPONSE.GET);
    } catch (error) {
      this.logger.error(
        `authenticate=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('refresh-token')
  @ApiOperation({ summary: 'Refresh Access Token' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Unprotected(true)
  async refreshAccessToken(@Body() payload: BaseRefreshTokenRequestDTO) {
    try {
      const { is_revoked, value } =
        await this.blacklistService.checkTokenStatus(
          payload.refresh_token,
          true,
        );
      if (is_revoked) {
        throwErrorMessage(
          { error_code: ERROR_CODE.AUTH.UNAUTHORIZED },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const response = await this.userService.refreshToken(payload, value);
      return await this.returnResponse(response, RESPONSE.GET);
    } catch (error) {
      this.logger.error(
        `refreshAccessToken=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Post('logout')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Logout Account Session' })
  @Unprotected(true)
  async logout(@Body() payload: BaseLogoutRequestDTO) {
    try {
      const { is_revoked, value } =
        await this.blacklistService.checkTokenStatus(
          payload.refresh_token,
          true,
        );
      if (is_revoked) {
        throwErrorMessage(
          { error_code: ERROR_CODE.AUTH.UNAUTHORIZED },
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.userService.logout(value);
      return await this.returnResponse(true, RESPONSE.GET);
    } catch (error) {
      this.logger.error(
        `logout=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Get('profile')
  @OnlyVerify(true)
  async getProfile(@User() user: IAccessTokenPayload) {
    try {
      const response = await this.userService.getInformation(user.sub);
      return await this.returnResponse(response, RESPONSE.GET);
    } catch (error) {
      this.logger.error(
        `getProfile=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('reset-password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Unprotected()
  @ApiOperation({ summary: 'Update Account Password (ONLY ADMIN SERVICE)' })
  async resetPassword(@Body() payload: ResetPasswordDTO) {
    try {
      const response = await this.userService.resetPasswordByEmail(payload);
      return this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('forgot-password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Unprotected()
  @ApiOperation({ summary: 'Forgot Password From Email Request' })
  async forgotPassword(@Body() payload: ForgotPasswordDTO) {
    try {
      payload.type = ACCOUNT_TYPE.PUBLISHER;
      const response = await this.userService.forgotPassword(payload);
      return this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('session/verify')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Unprotected()
  @ApiOperation({ summary: 'Verify Reset Email Session' })
  async verifyResetEmailSession(@Body() query: VerifyEmailSessionDTO) {
    try {
      const response = await this.userService.verifyEmailSessionCode(
        query.code,
      );
      return this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('profile/update')
  @OnlyVerify(true)
  async updateProfile(
    @User() user: IAccessTokenPayload,
    @Body() payload: UpdateProfileDTO,
  ) {
    try {
      const response = await this.userService.updateProfile(user.sub, payload);
      return await this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      this.logger.error(
        `update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }

  @Put('profile/update-password')
  @OnlyVerify(true)
  async updateProfilePassword(
    @User() user: IAccessTokenPayload,
    @Body() payload: ResetPasswordDTO,
  ) {
    try {
      const response = await this.userService.updateProfilePasword(
        user.sub,
        payload,
      );
      return await this.returnResponse(response, RESPONSE.UPDATE);
    } catch (error) {
      this.logger.error(
        `update=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throwErrorMessage();
    }
  }
}

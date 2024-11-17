import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  CreateSponsorDTO,
  UpdateSponsorDTO,
  UpdateStatusDTO,
} from '@app/modules/sponsor/dto';
import {
  ACCOUNT_TYPE,
  BaseService,
  COLLECTION,
  Common,
  CONNECTION_NAME,
  EMITTER,
  ENUM_DATE_TIME,
  ENUM_MODEL,
  ENUM_POPULATE_AGGREGATE,
  ENUM_STATUS,
  ENVIROMENT_VARIABLE,
  LOG_ACTION,
  POPULATE,
} from '@app/common';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  DisplayStatus,
  isTransitionValid,
  ProductionStatus,
  SponsorshipStatus,
} from './enums';
import {
  SponsorLog,
  SponsorLogDocument,
} from '@app/schemas/sponsor.log.schema';
import { IReject, ISponsor, Sponsor, SponsorDocument } from '@app/schemas';
import { ISelectAfterQuery } from '@app/common/interfaces';
import { AttributeCategoryService } from '../sponsor-attribute/attribute-category.service';
import { AttributeBudgetRangeService } from '../sponsor-attribute/attribute-budget-range.service';
import * as moment from 'moment';
import {
  DRAFT_PROPERTIES,
  NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS,
  PACKAGE_SCALE,
  VERIFY_PROPERTIES,
} from './constants';
import { throwErrorMessage } from '@app/shared';
import { ERROR_CODE } from '@app/common/constants/error.constant';
import { IAccessTokenPayload } from '@app/shared/jwt/interfaces/jwt.interface';
import { HttpService } from '@nestjs/axios';
import { IsBoolean } from 'class-validator';
import { OnEvent } from '@nestjs/event-emitter';
import { SettingService } from '../setting/setting.service';
import {
  ENUM_SETTING_CLIENT_CONTENT,
  ENUM_SETTING_KEY,
} from '../setting/enums';
import { MailService } from '@app/shared/mail/mail.service';
import { SponsorLogPreDataEntity } from './entities/sponsor-log-pre-data.entity';
import { MAIL_SUBJECT, TEMPLATE } from '@app/common/enums/mail.enum';
@Injectable()
export class SponsorService extends BaseService<any> {
  model_name = ENUM_MODEL.SPONSOR;

  constructor(
    @InjectModel(Sponsor.name, CONNECTION_NAME.PRIMARY)
    readonly model: Model<SponsorDocument>,
    @InjectModel(Sponsor.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<SponsorDocument>,
    @InjectModel(SponsorLog.name, CONNECTION_NAME.PRIMARY)
    readonly sponsorLogModel: Model<SponsorLogDocument>,
    private readonly attributeCategoryService: AttributeCategoryService,
    private readonly attributeBudgetRangeService: AttributeBudgetRangeService,
    private readonly settingService: SettingService,
    private readonly httpService: HttpService,
    private readonly mailService: MailService,
  ) {
    super(model, readModel);
  }

  conditionFindAll(query): {
    condition: any;
    condition_keyword: any;
    sort: any;
    select_after_query: ISelectAfterQuery;
  } {
    const {
      condition,
      condition_option,
      condition_keyword,
      sort,
      select_after_query,
    } = Common._conditionFindAll({
      query,
      condition_fields: [
        'display_status',
        // 'sponsorship_status',
        // 'production_status',
        // 'sponsor_categories',
        'sponsor_hashtags',
        'casts',
        'platforms',
        'sponsorship_forms',
      ],
    });

    if (query.sponsorship_status) {
      const sponsorship_status = query.sponsorship_status?.split(',');
      condition.sponsorship_status = {
        $in: Common.toObjectId(sponsorship_status),
      };
    }
    if (query.production_status) {
      const production_status = query.production_status?.split(',');
      condition.production_status = {
        $in: Common.toObjectId(production_status),
      };
    }
    if (query.sponsor_categories) {
      const sponsor_categories = query.sponsor_categories?.split(',');
      condition.sponsor_categories = {
        $in: Common.toObjectId(sponsor_categories),
      };
    }

    if (query.created_by) {
      condition['created_by'] = Common.toObjectId(query.created_by);
    }

    if (condition_option.exclude) {
      condition['_id'] = { $ne: condition_option.exclude };
    }

    if (query.year) {
      const years = query.year?.split(',');
      years?.map((year) => {
        year = Number(year);
        if (!isNaN(year)) {
          const start_of_year: any = moment().year(year).startOf('year');
          const end_of_year: any = moment().year(year).endOf('year');
          if (!condition['$or']) {
            condition['$or'] = [];
          }
          condition['$or'].push({
            start_date: {
              $lte: new Date(
                moment(start_of_year).format(ENUM_DATE_TIME.YYYY_MM_DD) +
                ENUM_DATE_TIME.END_OFFSET,
              ),
            },
            end_date: {
              $gte: new Date(
                moment(end_of_year).format(ENUM_DATE_TIME.YYYY_MM_DD) +
                ENUM_DATE_TIME.START_OFFSET,
              ),
            },
          });
          condition['$or'].push({
            start_date: Common.createConditionFromDateToDate(
              start_of_year,
              end_of_year,
            ),
          });
          condition['$or'].push({
            end_date: Common.createConditionFromDateToDate(
              start_of_year,
              end_of_year,
            ),
          });
        }
      });
    }

    return {
      condition: condition,
      condition_keyword: condition_keyword,
      sort: sort,
      select_after_query: select_after_query,
    };
  }

  /**
   * Get all
   */
  async findAll(query: any = {}): Promise<any[]> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];
    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  /**
   * Get all Admin available
   */
  async findAllAvailable(query: any = {}): Promise<any[]> {
    query['display_statuses'] =
      `${DisplayStatus.APPROVED},${DisplayStatus.LISTED},${DisplayStatus.HIDEN},${DisplayStatus.LEAVING},${DisplayStatus.EXPIRED},${DisplayStatus.REFUSE}`;
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];

    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      // ...this.destructorMinAndMaxPackageValue(
      //   'sponsorship_packages',
      //   'sponsor_package_unit',
      //   'sponsorship_package_values',
      //   'sponsor_package_min',
      //   'sponsor_package_max',
      // ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];

    if (query.budget_ranges) {
      await this.handleQueryBudgetRanges(
        query.budget_ranges,
        condition_keyword,
      );

      lookup.push(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    } else {
      lookup_after.unshift(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    }

    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  /**
   * Get all Admin pending
   */
  async findAllPending(query: any = {}): Promise<any[]> {
    query['display_status'] = `${DisplayStatus.PENDING}`;
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];
    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  async findAllForClientHomePage(query: any = {}): Promise<any> {
    query.display_statuses = `${DisplayStatus.LISTED},${DisplayStatus.LEAVING},${DisplayStatus.EXPIRED}`;
    const { condition, condition_keyword, select_after_query } =
      this.conditionFindAll(query);

    Object.assign(query, {
      is_paging: true,
      per_page: 6,
    });
    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [
      {
        $addFields: {
          prioritySort: {
            $cond: {
              if: { $eq: ['$priority', null] },
              then: Number.MAX_VALUE,
              else: '$priority',
            },
          },
        },
      },
    ];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      {
        $lookup: {
          from: COLLECTION.ATTRIBUTE_PLATFORM,
          localField: 'platforms.platform',
          foreignField: '_id',
          as: 'platforms',
        },
      },
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];

    const sort = {
      prioritySort: 1,
      created_at: -1,
    };

    const sponsors = await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );

    const query_attribute = {
      is_paging: false,
    };
    const condition_attribute = {
      status: ENUM_STATUS.ACTIVE,
    };
    const select_attribute = 'name code description image';
    const [categories, budget_ranges] = (await Promise.allSettled([
      this.attributeCategoryService._findAll(
        query_attribute,
        condition_attribute,
        {},
        [],
        select_attribute,
        null,
      ),
      this.attributeBudgetRangeService._findAll(
        query_attribute,
        condition_attribute,
        {},
        [],
        select_attribute,
        {
          'min_range.value': 1,
        },
      ),
    ])) as any;

    const home_contents = await this.settingService.findByKey(
      ENUM_SETTING_KEY.CLIENT_CONTENT,
    );

    return {
      sponsors: sponsors?.data || [],
      home_contents: {
        [`${ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_FUTURE}`]:
          home_contents[
          ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_FUTURE
          ],
        [`${ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_CONNECT}`]:
          home_contents[
          ENUM_SETTING_CLIENT_CONTENT.CLIENT_CONTENT_HOME_PAGE_CONNECT
          ],
      },
      attributes: {
        categories: categories?.value?.data || [],
        budget_ranges: budget_ranges?.value?.data || [],
      },
    };
  }

  async findAllForCalendar(query: any): Promise<any> {
    query.display_statuses = `${DisplayStatus.LISTED},${DisplayStatus.LEAVING},${DisplayStatus.EXPIRED}`;
    const { condition, condition_keyword, sort }: any =
      this.conditionFindAll(query);

    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      // ...this.destructorMinAndMaxPackageValue(
      //   'sponsorship_packages',
      //   'sponsor_package_unit',
      //   'sponsorship_package_values',
      //   'sponsor_package_min',
      //   'sponsor_package_max',
      // ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      {
        $project: {
          sponsor_name: 1,
          display_status: 1,
          production_status: 1,
          sponsorship_status: 1,
          sponsor_categories: 1,
          cover_image: 1,
          start_date: 1,
          end_date: 1,
          sponsorship_expiration_date: 1,
          sponsor_package_unit: 1,
          sponsor_package_min: 1,
          sponsor_package_max: 1,
          sponsor_package_min_trans: 1,
          sponsor_package_max_trans: 1,
        },
      },
    ];

    if (query.budget_ranges) {
      await this.handleQueryBudgetRanges(
        query.budget_ranges,
        condition_keyword,
      );

      lookup.push(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    } else {
      lookup_after.unshift(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    }

    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  async findAllForClient(query: any): Promise<any> {
    query.display_statuses = `${DisplayStatus.LISTED},${DisplayStatus.LEAVING},${DisplayStatus.EXPIRED}`;

    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);
    // sponsor_package_min
    // sponsor_package_max
    // sponsor_package_min_trans
    // sponsor_package_max_trans
    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      {
        $lookup: {
          from: COLLECTION.ATTRIBUTE_PLATFORM,
          localField: 'platforms.platform',
          foreignField: '_id',
          as: 'platforms',
        },
      },
      // ...this.destructorMinAndMaxPackageValue(
      //   'sponsorship_packages',
      //   'sponsor_package_unit',
      //   'sponsorship_package_values',
      //   'sponsor_package_min',
      //   'sponsor_package_max',
      // ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];

    if (query.budget_ranges || sort.hasOwnProperty('sponsor_package')) {
      if (query.budget_ranges) {
        await this.handleQueryBudgetRanges(
          query.budget_ranges,
          condition_keyword,
        );
      }

      lookup.push(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
        {
          $addFields: {
            sponsor_package: '$sponsor_package_max',
          },
        },
      );
    } else {
      lookup_after.unshift(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    }

    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  /**
   * Get all
   */
  async findAllForPublisher(query: any = {}): Promise<any[]> {
    const { condition, condition_keyword, sort, select_after_query } =
      this.conditionFindAll(query);

    const condition_keyword_after = {};
    const lookup: mongoose.PipelineStage[] = [];
    const lookup_after: mongoose.PipelineStage[] = [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      // ...this.destructorMinAndMaxPackageValue(
      //   'sponsorship_packages',
      //   'sponsor_package_unit',
      //   'sponsorship_package_values',
      //   'sponsor_package_min',
      //   'sponsor_package_max',
      // ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      ...select_after_query.select_by_project_aggregate,
    ];

    if (query.budget_ranges) {
      await this.handleQueryBudgetRanges(
        query.budget_ranges,
        condition_keyword,
      );

      lookup.push(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    } else {
      lookup_after.unshift(
        ...this.destructorMinAndMaxPackageValue(
          'sponsorship_packages',
          'sponsor_package_unit',
          'sponsorship_package_values',
          'sponsor_package_min',
          'sponsor_package_max',
        ),
      );
    }

    return await this._getAll(
      query,
      condition,
      condition_keyword,
      lookup,
      sort,
      condition_keyword_after,
      lookup_after,
    );
  }

  async findSponsorShortDetailForSocial(_id: any): Promise<ISponsor> {
    const sponsor = await this._findById(
      _id,
      [],
      'sponsor_name cover_image short_description',
    );
    return sponsor;
  }

  async findOneForClient(_id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: Common.toObjectId(_id),
          display_status: {
            $in: [
              DisplayStatus.LISTED,
              DisplayStatus.LEAVING,
              DisplayStatus.EXPIRED,
            ],
          },
        },
      },
      {
        $lookup: {
          from: COLLECTION.ATTRIBUTE_CAST,
          let: { refIDs: '$casts' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                },
              },
            },
            ...(Common.lookupArrayField(
              COLLECTION.ATTRIBUTE_CAST_PROFESSION,
              'cast_professions',
              ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
            ) as any),
            {
              $project: {
                ...ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
                cast_professions: 1,
              },
            },
          ],
          as: 'casts',
        },
      },
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_HASHTAG,
        'sponsor_hashtags',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),

      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.lookupSponsorshipForms(),
      ...this.lookupPlatforms(),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      {
        $project: {
          __v: 0,
          sponsorship_form_source_datas: 0,
          platform_source_datas: 0,
        },
      },
    ];

    const data = await this._aggregate(aggregate);

    return data?.[0];
  }

  async findOneForPublisher(_id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: Common.toObjectId(_id),
        },
      },
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_HASHTAG,
        'sponsor_hashtags',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),

      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.lookupSponsorshipForms(),
      ...this.lookupPlatforms(),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      {
        $project: {
          __v: 0,
          sponsorship_form_source_datas: 0,
          platform_source_datas: 0,
        },
      },
    ];

    const data = await this._aggregate(aggregate);

    return data?.[0];
  }

  async findOneForAdminPreview(_id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: Common.toObjectId(_id),
        },
      },
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_HASHTAG,
        'sponsor_hashtags',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),

      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.lookupSponsorshipForms(),
      ...this.lookupPlatforms(),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      {
        $project: {
          __v: 0,
          sponsorship_form_source_datas: 0,
          platform_source_datas: 0,
        },
      },
    ];

    const data = await this._aggregate(aggregate);

    return data?.[0];
  }

  async findOneForAdmin(_id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: Common.toObjectId(_id),
        },
      },
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_HASHTAG,
        'sponsor_hashtags',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),

      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      ...this.lookupSponsorshipForms(),
      ...this.lookupPlatforms(),
      ...this.destructorMinAndMaxPackageValue(
        'sponsorship_packages',
        'sponsor_package_unit',
        'sponsorship_package_values',
        'sponsor_package_min',
        'sponsor_package_max',
      ),
      {
        $addFields: {
          sponsor_package_min_trans: this.convertPackageValueToString(
            'sponsor_package_min',
          ),
          sponsor_package_max_trans: this.convertPackageValueToString(
            'sponsor_package_max',
          ),
        },
      },
      {
        $project: {
          __v: 0,
          sponsorship_form_source_datas: 0,
          platform_source_datas: 0,
        },
      },
    ];

    const data = await this._aggregate(aggregate);

    return data?.[0];
  }

  logSponsorUpdate(
    sponsor: string,
    user: string,
    // updatedFields: string[],
    pre_data: Record<string, any>,
    updated_data: Record<string, any>,
    action: string,
  ): void {
    try {
      // Kiểm tra hợp lệ
      if (!sponsor || !user) {
        this.logger.error('Sponsor_log: Missing required parameters');
      }

      // Tạo bản ghi log
      this.sponsorLogModel.create({
        sponsor: sponsor,
        created_by: user,
        updated_by: user,
        // updated_fields: updatedFields,
        previous_data: pre_data, // Lưu dưới dạng đối tượng
        updated_data: updated_data, // Lưu dưới dạng đối tượng
        action,
      });
    } catch (error) {
      // Xử lý lỗi ghi log
      this.logger.error('Error logging sponsor update:', error);
    }
  }

  async findById(_id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: Common.toObjectId(_id),
        },
      },
      // Casts
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_CAST,
        'casts',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      // sponsor_categories
      ...Common.lookupOneField(
        COLLECTION.ATTRIBUTE_CATEGORY,
        'sponsor_categories',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_HASHTAG,
        'sponsor_hashtags',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
      ),
      // created_by
      ...Common.lookupOneField(
        COLLECTION.USER,
        'created_by',
        ENUM_POPULATE_AGGREGATE.USER,
      ),
      // sponsorship_forms
      {
        $lookup: {
          from: COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
          let: { refIDs: '$sponsorship_forms.sponsorship_form' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                },
              },
            },
            {
              $lookup: {
                from: COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
                localField: 'sponsor_benefit',
                foreignField: '_id',
                as: 'sponsor_benefit_data',
              },
            },
            { $unwind: '$sponsor_benefit_data' },
            // {
            //   $project: {
            //     ...ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
            //     sponsor_benefit: 1
            //   },
            // },
          ],
          as: 'sponsorship_form_source_datas',
        },
      },
      // platforms
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_PLATFORM,
        'platforms.platform',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
        '$_id',
        'platform_source_datas',
      ),
      // handle platforms
      ...Common.mergeObjectAfterLookupArray(
        'platforms',
        'platforms',
        'platform_source_datas',
        'platform',
      ),
      // handle sponsorship_forms
      ...Common.mergeObjectAfterLookupArray(
        'sponsorship_forms',
        'sponsorship_forms',
        'sponsorship_form_source_datas',
        'sponsorship_form',
      ),
      {
        $project: {
          __v: 0,
          sponsorship_form_source_datas: 0,
          platform_source_datas: 0,
        },
      },
    ];

    const data = await this._aggregate(aggregate);

    return data?.[0];
  }

  async findSponsorsWithExpiration(): Promise<any[]> {
    return await this.model.find({
      sponsorship_expiration_date: { $exists: true, $gte: new Date() },
      display_status: {
        $nin: [
          DisplayStatus.REFUSE,
          DisplayStatus.HIDEN,
          DisplayStatus.EXPIRED,
          DisplayStatus.APPROVED,
          DisplayStatus.DRAFT,
          DisplayStatus.PENDING,
        ],
      },
    });
  }

  lookupPlatforms() {
    return [
      ...Common.lookupArrayField(
        COLLECTION.ATTRIBUTE_PLATFORM,
        'platforms.platform',
        ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
        '$_id',
        'platform_source_datas',
      ),
      ...Common.mergeObjectAfterLookupArray(
        'platforms',
        'platforms',
        'platform_source_datas',
        'platform',
      ),
    ];
  }

  lookupSponsorshipForms(): mongoose.PipelineStage[] {
    return [
      {
        $lookup: {
          from: COLLECTION.ATTRIBUTE_SPONSORSHIP_FORM,
          let: { refIDs: '$sponsorship_forms.sponsorship_form' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', { $ifNull: ['$$refIDs', []] }],
                },
              },
            },
            ...(Common.lookupOneField(
              COLLECTION.ATTRIBUTE_SPONSORSHIP_BENEFIT,
              'sponsor_benefit',
              ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
            ) as any),
            {
              $project: {
                ...ENUM_POPULATE_AGGREGATE.ATTRIBUTE_COMMON,
                sponsor_benefit: 1,
              },
            },
          ],
          as: 'sponsorship_form_source_datas',
        },
      },
      ...Common.mergeObjectAfterLookupArray(
        'sponsorship_forms',
        'sponsorship_forms',
        'sponsorship_form_source_datas',
        'sponsorship_form',
      ),
    ];
  }

  convertPackageValueToString(convert_value) {
    return {
      $cond: {
        if: {
          $eq: [{ $isNumber: `$${convert_value}` }, true],
        },
        then: {
          $cond: {
            if: {
              $gte: [`$${convert_value}`, PACKAGE_SCALE.THOUSAND_BILLION.value],
            }, // ngàn tỷ
            then: {
              $concat: [
                {
                  $toString: {
                    $round: [
                      {
                        $divide: [
                          `$${convert_value}`,
                          PACKAGE_SCALE.THOUSAND_BILLION.value,
                        ],
                      },
                      1,
                    ],
                  },
                },
                ` ${PACKAGE_SCALE.THOUSAND_BILLION.trans_scale}`,
              ],
            },
            else: {
              $cond: {
                if: {
                  $gte: [`$${convert_value}`, PACKAGE_SCALE.BILLION.value],
                }, // tỷ
                then: {
                  $concat: [
                    {
                      $toString: {
                        $round: [
                          {
                            $divide: [
                              `$${convert_value}`,
                              PACKAGE_SCALE.BILLION.value,
                            ],
                          },
                          1,
                        ],
                      },
                    },
                    ` ${PACKAGE_SCALE.BILLION.trans_scale}`,
                  ],
                },
                else: {
                  $cond: {
                    if: {
                      $gte: [`$${convert_value}`, PACKAGE_SCALE.MILLION.value],
                    }, // triệu
                    then: {
                      $concat: [
                        {
                          $toString: {
                            $round: [
                              {
                                $divide: [
                                  `$${convert_value}`,
                                  PACKAGE_SCALE.MILLION.value,
                                ],
                              },
                              1,
                            ],
                          },
                        },
                        ` ${PACKAGE_SCALE.MILLION.trans_scale}`,
                      ],
                    },
                    else: {
                      $cond: {
                        if: {
                          $gte: [
                            `$${convert_value}`,
                            PACKAGE_SCALE.THOUSAND.value,
                          ],
                        }, // ngàn
                        then: {
                          $concat: [
                            {
                              $toString: {
                                $round: [
                                  {
                                    $divide: [
                                      `$${convert_value}`,
                                      PACKAGE_SCALE.THOUSAND.value,
                                    ],
                                  },
                                  1,
                                ],
                              },
                            },
                            ` ${PACKAGE_SCALE.THOUSAND.trans_scale}`,
                          ],
                        },
                        else: {
                          $concat: [
                            {
                              $toString: {
                                $round: [
                                  {
                                    $divide: [`$${convert_value}`, 1],
                                  },
                                  1,
                                ],
                              },
                            },
                            ` đ`,
                          ],
                        }, // đ
                      },
                    },
                  },
                },
              },
            },
          },
        },
        else: `$${convert_value}`,
      },
    };
  }

  destructorMinAndMaxPackageValue(
    package_field,
    new_unit_field,
    new_range_field,
    new_min_field,
    new_max_field,
  ) {
    return [
      {
        $addFields: {
          [`${new_range_field}`]: {
            $reduce: {
              input: `$${package_field}`,
              initialValue: [],
              in: {
                $concatArrays: ['$$value', ['$$this.package_value']],
              },
            },
          },
          [`${new_unit_field}`]: {
            $arrayElemAt: [`$${package_field}.package_unit`, -1],
          },
        },
      },
      {
        $addFields: {
          [`${new_min_field}`]: {
            $min: `$${new_range_field}`,
          },
          [`${new_max_field}`]: {
            $max: `$${new_range_field}`,
          },
        },
      },
      {
        $addFields: {
          [`${new_min_field}`]: {
            $cond: [
              { $eq: [`$${new_min_field}`, `$${new_max_field}`] },
              0,
              `$${new_min_field}`,
            ],
          },
        },
      },
    ];
  }

  async handleQueryBudgetRanges(budget_ranges, condition_keyword) {
    budget_ranges = budget_ranges?.split(',');
    const budget_range_datas = await this.attributeBudgetRangeService._find({
      _id: { $in: Common.toObjectId(budget_ranges) },
    });
    budget_range_datas?.map((budget_range_data) => {
      const min_range = budget_range_data?.min_range?.value;
      const max_range = budget_range_data?.max_range?.value;
      if (min_range && max_range) {
        if (!condition_keyword['$or']) {
          condition_keyword['$or'] = [];
        }
        condition_keyword['$or'].push({
          sponsor_package_min: {
            $lte: min_range,
          },
          sponsor_package_max: {
            $gte: max_range,
          },
        });
        condition_keyword['$or'].push({
          sponsor_package_min: Common.createConditionFromValueToValue(
            min_range,
            max_range,
          ),
        });
        condition_keyword['$or'].push({
          sponsor_package_max: Common.createConditionFromValueToValue(
            min_range,
            max_range,
          ),
        });
      }
    });
  }

  async create(payload: CreateSponsorDTO): Promise<ISponsor> {
    this._validateSponsorDate(payload);
    if (Common.compareValues(payload.display_status, DisplayStatus.DRAFT)) {
      payload = this._transformDraft(payload);
      payload.production_status =
        payload?.production_status || ProductionStatus.PLANNING;
      payload.introduction_images = payload?.introduction_images?.filter(
        (element) => {
          return element;
        },
      );
    }
    payload.sponsorship_status = this._handleSponporStatus(payload);
    return await this._create(payload);
  }

  async update(
    id: string,
    payload: UpdateSponsorDTO,
    user: IAccessTokenPayload,
  ): Promise<ISponsor> {
    const sponsor = await this._getInformation(id);
    if (
      Common.compareValues(user.account_type, ACCOUNT_TYPE.PUBLISHER) &&
      Common.compareValues(sponsor.display_status, DisplayStatus.EXPIRED)
    ) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.SPONSOR.EXPIRED,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this._validateSponsorDate(payload);
    if (
      !Common.compareValues(sponsor.display_status, DisplayStatus.DRAFT) &&
      Common.compareValues(payload?.display_status, DisplayStatus.DRAFT)
    ) {
      throwErrorMessage(
        { error_code: ERROR_CODE.SPONSOR.DISPLAY_STATUS.NOT_DRAFT },
        HttpStatus.BAD_REQUEST,
      );
    }
    // Trạng Thái Bài Viết Ở Trạng Thái Đã Duyệt
    if (Common.compareValues(sponsor.display_status, DisplayStatus.APPROVED)) {
      // Publisher chỉ được bấm xác nhận để Save và không được change trạng thái
      if (
        Common.compareValues(user.account_type, ACCOUNT_TYPE.PUBLISHER) &&
        !Common.compareValues(sponsor.display_status, payload?.display_status)
      ) {
        throwErrorMessage(
          {
            error_code: ERROR_CODE.SPONSOR.PUBLISHER.NOT_ALLOWED_CHANGE_STATUS,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    let isPushCronScheduler: boolean = false;
    // Trạng Thái Bài Viết Ở Trạng Thái Đã Phát Hành
    if (
      [
        DisplayStatus.LISTED,
        DisplayStatus.HIDEN,
        DisplayStatus.LEAVING,
        DisplayStatus.EXPIRED,
      ]?.includes(sponsor.display_status as DisplayStatus)
    ) {
      // Publisher thay đổi thông tin bài viết ngoài trạng thái sản xuất, trạng thái gói tài trợ
      if (
        Common.compareValues(user.account_type, ACCOUNT_TYPE.PUBLISHER) &&
        this._validateInvalidChanges(sponsor, payload)
      ) {
        throwErrorMessage(
          {
            error_code: ERROR_CODE.SPONSOR.PUBLISHER.NOT_ALLOWED_CHANGES,
            i18nArgs: {
              attribute:
                sponsor.display_status === DisplayStatus.LISTED
                  ? 'đã đăng'
                  : 'ẩn',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        Common.compareValues(user.account_type, ACCOUNT_TYPE.ADMIN) &&
        !Common.compareValues(
          Common.getLocalOffset(sponsor.sponsorship_expiration_date),
          Common.getLocalOffset(payload.sponsorship_expiration_date),
        )
      ) {
        if (
          [
            DisplayStatus.LISTED,
            DisplayStatus.LEAVING,
            DisplayStatus.EXPIRED,
          ].includes(sponsor.display_status as DisplayStatus)
        ) {
          const leavingDate = moment(
            Common.getLocalOffset(payload.sponsorship_expiration_date),
          )
            .subtract(NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS, 'days')
            .toDate();

          if (
            moment(new Date()).isAfter(
              Common.getLocalOffset(payload.sponsorship_expiration_date),
            )
          ) {
            payload.display_status = DisplayStatus.EXPIRED;
            payload.priority = null;
          } else if (moment(new Date()).isAfter(leavingDate)) {
            payload.display_status = DisplayStatus.LEAVING;
          } else {
            payload.display_status = DisplayStatus.LISTED;
          }
          isPushCronScheduler = true;
        }
      }
    }
    payload.sponsorship_status = this._handleSponporStatus(payload);
    // Check introduction_images
    if (payload.introduction_images) {
      payload.introduction_images = payload.introduction_images?.filter(
        Boolean,
      ) as any;
    }

    // Log data change
    if (
      [
        DisplayStatus.APPROVED,
        DisplayStatus.LISTED,
        DisplayStatus.HIDEN,
        DisplayStatus.LEAVING,
        DisplayStatus.EXPIRED,
      ]?.includes(sponsor.display_status as DisplayStatus)
    ) {
      const preLogData = new SponsorLogPreDataEntity(sponsor);
      const data_changed = this._filterFieldChanged(sponsor, payload as any);
      this.logSponsorUpdate(
        id,
        user?.sub,
        preLogData,
        data_changed,
        LOG_ACTION.UPDATE,
      );
    }

    const updateSponsor = await this._findByIdAndUpdate(id, payload);
    if (isPushCronScheduler) {
      this.eventEmitterT.emit(
        EMITTER.SYNCHORONIZED_SCHEDULER_CRON,
        updateSponsor,
      );
    }
    return updateSponsor;
  }

  async updateStatus(id: string, payload: UpdateStatusDTO): Promise<Sponsor> {
    const new_status = payload.display_status as DisplayStatus;
    const reason = payload?.reason;
    const user = payload.updated_by;

    const sponsor = await this._getInformation(id);

    if (!isTransitionValid(sponsor.display_status, new_status)) {
      throw new BadRequestException('Invalid status transition');
    }

    const updatePayload: Partial<ISponsor> = {
      display_status: new_status,
      updated_by: user || undefined,
      updated_at: payload.updated_at || new Date(),
    };

    const newLogData = {
      display_status: new_status,
    };

    if (Common.compareValues(new_status, DisplayStatus.REFUSE)) {
      if (!reason) {
        throw new BadRequestException(
          'Reason is required when setting status to REFUSE',
        );
      }
      const rejectInstance: IReject = {
        reason: payload.reason,
        refuser: user,
        created_at: payload.updated_at,
      };
      updatePayload.reason_rejected = rejectInstance;
      updatePayload.rejected_histories = sponsor?.rejected_histories.concat([
        rejectInstance,
      ]);

      // if (
      //   !Common.compareValues(new_status, DisplayStatus.REFUSE) &&
      //   Common.compareValues(sponsor.display_status, DisplayStatus.REFUSE)
      // ) {
      //   preLogData['reason_rejected'] = sponsor.reason_rejected;
      //   // preLogData['rejected_histories'] = sponsor.rejected_histories;
      // }
    }

    if (new_status === DisplayStatus.APPROVED) {
      updatePayload.user_approved = user;
      updatePayload.approved_date = sponsor.approved_date
        ? sponsor.approved_date
        : new Date();
    }

    // Change status Ẩn -> Phát hành
    // Nếu đã quá ngày hết hạn , auto change to Hết hạn
    if (
      // sponsor.display_status === DisplayStatus.HIDEN &&
      new_status === DisplayStatus.LISTED
    ) {
      const leavingDate = moment(
        Common.getLocalOffset(sponsor.sponsorship_expiration_date),
      )
        .subtract(NUMBER_DAYS_CHANGE_LEAVING_TO_EXPRIED_STATUS, 'days')
        .toDate();

      if (
        moment(new Date()).isAfter(
          Common.getLocalOffset(sponsor.sponsorship_expiration_date),
        )
      ) {
        updatePayload.display_status = DisplayStatus.EXPIRED;
      } else if (moment(new Date()).isAfter(leavingDate)) {
        updatePayload.display_status = DisplayStatus.LEAVING;
      }
      this.eventEmitterT.emit(EMITTER.SYNCHORONIZED_SCHEDULER_CRON, sponsor);
    }

    // Xóa độ ưu tiên khi bài đăng hết hạn
    if (new_status === DisplayStatus.EXPIRED) {
      updatePayload.priority = null;
    }

    const preLogData = new SponsorLogPreDataEntity(sponsor);
    this.logSponsorUpdate(
      id,
      user,
      preLogData,
      newLogData,
      LOG_ACTION.UPDATE_STATUS,
    );

    let isPushCronScheduler = false;
    if (
      [
        DisplayStatus.LISTED,
        DisplayStatus.LEAVING,
        DisplayStatus.HIDEN,
      ].includes(sponsor.display_status as DisplayStatus)
    ) {
      isPushCronScheduler = true;
    }

    const updatedSponsor = await this._findByIdAndUpdate(id, updatePayload);
    if (isPushCronScheduler) {
      this.eventEmitterT.emit(
        EMITTER.SYNCHORONIZED_SCHEDULER_CRON,
        updatedSponsor,
      );
    }
    return updatedSponsor;
  }

  //#region PRIVATE
  _transformDraft(payload: CreateSponsorDTO): CreateSponsorDTO {
    for (const property of DRAFT_PROPERTIES) {
      if (payload?.[property.key]?.length) {
        payload[property.key] =
          payload[property.key]?.filter((element) => {
            const array = property.values.filter((value) => {
              return (
                element?.[value] ||
                element?.[value] === 0 ||
                IsBoolean(element?.[value])
              );
            });
            return array?.length === property.values?.length;
          }) || [];
      }
    }
    return payload;
  }

  private _validateSponsorDate(payload: CreateSponsorDTO): void {
    if (
      payload?.start_date &&
      payload?.end_date &&
      !moment(payload.end_date).isAfter(payload.start_date)
    ) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.SPONSOR.END_DATE.AFTER_START_DATE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      payload?.start_date &&
      payload?.sponsorship_expiration_date &&
      !moment(payload.sponsorship_expiration_date).isAfter(payload.start_date)
    ) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.SPONSOR.EXPIRATION_DATE.AFTER_START_DATE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // if (
    //   payload?.end_date &&
    //   moment(payload.end_date).isSameOrBefore(new Date())
    // ) {
    //   throwErrorMessage(
    //     {
    //       error_code: ERROR_CODE.SPONSOR.END_DATE.BEFORE_NOW,
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // if (
    //   payload?.sponsorship_expiration_date &&
    //   payload?.end_date &&
    //   !moment(payload.sponsorship_expiration_date).isSameOrAfter(
    //     payload.end_date,
    //   )
    // ) {
    //   throwErrorMessage(
    //     {
    //       error_code: ERROR_CODE.SPONSOR.EXPIRATION_DATE.BEFORE_END_DATE,
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  private async _getInformation(id: string): Promise<ISponsor> {
    const sponsor = await this._findById(Common.toObjectId(id));
    if (!sponsor) {
      throwErrorMessage(
        {
          error_code: ERROR_CODE.NOT_EXIST,
          i18nArgs: { attribute: 'Bài Sponsor' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return sponsor;
  }

  private _filterFieldChanged(
    old_data: ISponsor,
    new_data: ISponsor,
  ): ISponsor {
    try {
      // old_data = JSON.parse(JSON.stringify(old_data));
      // new_data = Common.convertDocumentToObject(new_data);
      const data: ISponsor = {} as ISponsor;
      for (const property in new_data) {
        if (!_.isEqual(old_data[property], new_data[property])) {
          data[property] = new_data[property];
        }
      }
      return data;
    } catch (error) {
      this.logger.error('Sponsor log fail', error?.message);
    }
  }

  private _validateInvalidChanges(
    sponsor: ISponsor,
    payload: UpdateSponsorDTO,
  ): boolean {
    let isChange: boolean = false;
    const arrayProperties = [
      'introduction_images',
      'casts',
      // 'introduction_images',
      // 'sponsor_hashtags',
    ];
    const singleProperies = [
      'sponsor_name',
      'cover_image',
      'banner_image',
      'sponsor_categories',
      'sponsor_kpi',
      'short_description',
      'detailed_description',
      'sponsorship_expiration_date',
      'start_date',
      'end_date',
      'product_limited_is_limit',
      'product_limited_description',
    ];

    for (const property of VERIFY_PROPERTIES) {
      if (singleProperies?.includes(property)) {
        if (
          ['sponsorship_expiration_date', 'start_date', 'end_date']?.includes(
            property,
          )
        ) {
          const current = sponsor?.[property]
            // ? moment(new Date(sponsor?.[property])).format('MM-DD-YYYY')
            ? moment(Common.getLocalOffset(sponsor[property], 'MM-DD-YYYY', 420))
            : null;
          const update = payload?.[property]
            // ? moment(new Date(payload?.[property])).format('MM-DD-YYYY')
            ? moment(Common.getLocalOffset(payload[property], 'MM-DD-YYYY', 0))
            : null;
          if (!Common.compareValues(current, update)) {
            // console.log('1', current, update);
            isChange = true;
            break;
          }
        } else {
          if (!Common.compareValues(sponsor?.[property], payload?.[property])) {
            // console.log('2', property, sponsor?.[property], payload?.[property]);
            isChange = true;
            break;
          }
        }
      }
      if (arrayProperties?.includes(property)) {
        const { newArray, oldArray } = Common.compareBetweenPastAndCurrent(
          sponsor?.[property]?.map((element) => element?.toString()),
          payload?.[property]?.map((element) => element?.toString()),
        );
        if (newArray?.length || oldArray?.length) {
          // console.log('3', sponsor?.[property], payload?.[property]);
          isChange = true;
          break;
        }
      }
      if (
        [
          'platforms',
          'sponsorship_forms',
          'sponsor_schedulers',
          'sponsorship_packages',
        ].includes(property)
      ) {
        sponsor[property] = sponsor?.[property]?.length
          ? sponsor?.[property]
          : [];
        payload[property] = payload?.[property]?.length
          ? payload?.[property]
          : [];
        if (sponsor?.[property]?.length !== payload?.[property]?.length) {
          // console.log('4', sponsor?.[property], payload?.[property]);
          isChange = true;
          break;
        } else {
          if (
            !this._validateArrayChanges(
              sponsor?.[property],
              payload?.[property],
              property,
            )
          ) {
            // console.log('5', sponsor?.[property], payload?.[property]);
            isChange = true;
            break;
          }
        }
      }
    }
    return isChange;
  }

  private _validateArrayChanges(
    olds: Array<any> = [],
    news: Array<any> = [],
    property: string,
  ): boolean {
    let isValid: boolean = true;
    const oldKeys = olds?.length ? Object.keys(olds[0]) : [];
    const newKeys = news?.length ? Object.keys(news[0]) : [];
    let keys = _.uniq(oldKeys.concat(newKeys));
    keys = keys.filter((key) => {
      return !['_id', 'status'].includes(key);
    });
    if (keys?.length) {
      for (const key of keys) {
        const oldValues = olds.map((element) => element[key]?.toString());
        const newValues = news.map((element) => element[key]?.toString());
        const { newArray, oldArray } = Common.compareBetweenPastAndCurrent(
          oldValues,
          newValues,
        );
        if (newArray?.length || oldArray?.length) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  private _handleSponporStatus(payload: UpdateSponsorDTO): SponsorshipStatus {
    const usages = payload?.sponsorship_packages?.filter((element) => {
      return element.status;
    });
    const availables = payload?.sponsorship_packages?.filter((element) => {
      return !element.status;
    });
    if (
      (!usages?.length && availables?.length > 1) ||
      !payload?.sponsorship_packages?.length
    ) {
      return SponsorshipStatus.NO_SPONSOR;
    }
    if (availables?.length) {
      if (availables?.length == 1) {
        return SponsorshipStatus.ONE_SPONSORSHIP_POSITION;
      } else {
        return SponsorshipStatus.SPONSORSHIP_AVAILABLE;
      }
    }
    return SponsorshipStatus.FULL;
  }

  private async _handleCronScheduler(sponsor: ISponsor): Promise<void> {
    try {
      let isOnlyRemove: Boolean = false;
      const uri = `${this.configService.get(ENVIROMENT_VARIABLE.SCHUDULER_API_URL)}/v1/schedules/set-cron-jobs/${sponsor._id}`;
      if (Common.compareValues(sponsor.display_status, DisplayStatus.HIDEN)) {
        isOnlyRemove = true;
      }
      await this.httpService.post(uri, { isOnlyRemove }).toPromise();
    } catch (error) {
      this.logger.error(error.message);
    }
  }
  //#endregion

  //#region SEND MAIL SPONSOR CLIENT
  // Client gởi mail nhanh
  async sendCustomEmail(body: { customer_email: string }) {
    const { customer_email } = body;
    return await this.mailService.sendMessageForUserMail({
      to: this.configService.get(ENVIROMENT_VARIABLE.ADMIN_MAIL),
      subject: MAIL_SUBJECT.CUSTOMER_MAIL,
      template: TEMPLATE.CUSTOMER_MAIL,
      context: { customer_email },
    });
  }

  // Client gởi mail liên hệ
  async sendContactEmail(body: {
    customer_email: string;
    issue_description: string;
    customer_name: string;
  }) {
    const { customer_email, issue_description, customer_name } = body;
    return await this.mailService.sendMessageForUserMail({
      to: this.configService.get(ENVIROMENT_VARIABLE.ADMIN_MAIL),
      subject: MAIL_SUBJECT.CONTACT_MAIL,
      template: TEMPLATE.CONTACT_MAIL,
      context: {
        customer_email,
        issue_description,
        customer_name,
      },
    });
  }

  // Client gởi mail liên hệ sponsor
  async sendDetailSponsorEmail(body: {
    customer_email: string;
    issue_description: string;
    sponsor_id: string;
  }) {
    const { customer_email, issue_description, sponsor_id } = body;

    const sponsor = await this._findById(sponsor_id, [
      { path: 'created_by', select: POPULATE.USER },
    ]);
    if (!sponsor || !sponsor.created_by.email) {
      throw new HttpException('Can not find sponsor', HttpStatus.BAD_REQUEST);
    }

    const publisher_name = sponsor.created_by.username;
    const sponsor_name = sponsor.sponsor_name;

    return await this.mailService.sendMessageForUserMail({
      to: sponsor.created_by.email,
      subject: MAIL_SUBJECT.SPONSOR_DETAIL_MAIL,
      template: TEMPLATE.SPONSOR_DETAIL_EMAIL,
      context: {
        customer_email,
        issue_description,
        sponsor_name,
        publisher_name,
      },
    });
  }
  //#endregion

  //#region EVENT EMIITER
  @OnEvent(EMITTER.SYNCHORONIZED_SCHEDULER_CRON)
  async handleEmitterSynchoronizedSchedulerCron(
    sponsor: ISponsor,
  ): Promise<void> {
    try {
      await this._handleCronScheduler(sponsor);
    } catch (error) {
      this.logger.error(
        `ERROR:EVENT_EMIITER: handleEmitterSynchoronizedSchedulerCron=>ROOT CAUSE: ${JSON.stringify(error?.message ?? error)}`,
      );
    }
  }
  //#endregion
}

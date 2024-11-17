import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import {
  BaseService,
  CONNECTION_NAME,
  ENUM_MODEL,
  ENUM_STATUS,
} from '@app/common';
import {
  AttributeCast,
  AttributeCastDocument,
  AttributeCastProfession,
  AttributeSponsorshipBenefit,
} from '@app/schemas';
import { AttributeCastService } from './attribute-cast.service';
import { AttributeBudgetRangeService } from './attribute-budget-range.service';
import { AttributeSponsorshipFormService } from './attribute-sponsorship-form.service';
import { AttributeSponsorshipBenefitService } from './attribute-sponsorship-benefit.service';
import { AttributePlatformService } from './attribute-platform.service';
import { AttributeHashtagService } from './attribute-hashtag.service';
import { AttributeCategoryService } from './attribute-category.service';

@Injectable()
export class AttributeService extends BaseService<AttributeCastDocument> {
  model_name = ENUM_MODEL.ATTRIBUTE;

  constructor(
    @InjectModel(AttributeCast.name, CONNECTION_NAME.PRIMARY)
    public readonly model: Model<AttributeCastDocument>,
    @InjectModel(AttributeCast.name, CONNECTION_NAME.SECONDARY)
    readonly readModel: Model<AttributeCastDocument>,

    private readonly attributeCastService: AttributeCastService,
    private readonly attributeCategoryService: AttributeCategoryService,
    private readonly attributeHashtagService: AttributeHashtagService,
    private readonly attributePlatformService: AttributePlatformService,
    private readonly attributeSponsorshipBenefitService: AttributeSponsorshipBenefitService,
    private readonly attributeSponsorshipFormService: AttributeSponsorshipFormService,
    private readonly attributeBudgetRangeService: AttributeBudgetRangeService,
  ) {
    super(model, readModel);
  }

  async findAll(query: any): Promise<any> {
    query.is_paging = false;
    const condition = {
      status: ENUM_STATUS.ACTIVE,
    };
    const select = 'name code description';
    const [
      casts,
      categories,
      tags,
      platforms,
      sponsorship_forms,
      sponsorship_benefits,
      budget_ranges,
    ] = (await Promise.allSettled([
      this.attributeCastService._findAll(
        query,
        condition,
        {},
        [
          {
            path: 'cast_professions',
            match: { status: ENUM_STATUS.ACTIVE },
            select,
            model: AttributeCastProfession.name,
          },
        ],
        select,
        null,
      ),
      this.attributeCategoryService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeHashtagService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributePlatformService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeSponsorshipFormService._findAll(
        query,
        condition,
        {},
        [
          {
            path: 'sponsor_benefit',
            match: { status: ENUM_STATUS.ACTIVE },
            select,
            model: AttributeSponsorshipBenefit.name,
          },
        ],
        select,
        null,
      ),
      this.attributeSponsorshipBenefitService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeBudgetRangeService._findAll(
        query,
        condition,
        {},
        [],
        select,
        {
          'min_range.value': 1,
        },
      ),
    ])) as any;

    return {
      casts: casts?.value?.data || [],
      categories: categories?.value?.data || [],
      tags: tags?.value?.data || [],
      platforms: platforms?.value?.data || [],
      sponsorship_forms: sponsorship_forms?.value?.data || [],
      sponsorship_benefits: sponsorship_benefits?.value?.data || [],
      budget_ranges: budget_ranges?.value?.data || [],
    };
  }

  async findAllForClient(query: any): Promise<any> {
    query.is_paging = false;
    const condition = {
      status: ENUM_STATUS.ACTIVE,
    };
    const select = 'name code description image';
    const [
      casts,
      categories,
      tags,
      platforms,
      sponsorship_forms,
      sponsorship_benefits,
      budget_ranges,
    ] = (await Promise.allSettled([
      this.attributeCastService._findAll(
        query,
        condition,
        {},
        [
          {
            path: 'cast_professions',
            match: { status: ENUM_STATUS.ACTIVE },
            select,
            model: AttributeCastProfession.name,
          },
        ],
        select,
        null,
      ),
      this.attributeCategoryService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeHashtagService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributePlatformService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeSponsorshipFormService._findAll(
        query,
        condition,
        {},
        [
          {
            path: 'sponsor_benefit',
            match: { status: ENUM_STATUS.ACTIVE },
            select,
            model: AttributeSponsorshipBenefit.name,
          },
        ],
        select,
        null,
      ),
      this.attributeSponsorshipBenefitService._findAll(
        query,
        condition,
        {},
        [],
        select,
        null,
      ),
      this.attributeBudgetRangeService._findAll(
        query,
        condition,
        {},
        [],
        select.concat(' min_range max_range'), // don't remove space
        {
          'min_range.value': 1,
        },
      ),
    ])) as any;

    return {
      casts: casts?.value?.data || [],
      sponsor_categories: categories?.value?.data || [],
      sponsor_hashtags: tags?.value?.data || [],
      platforms: platforms?.value?.data || [],
      sponsorship_forms: sponsorship_forms?.value?.data || [],
      sponsorship_benefits: sponsorship_benefits?.value?.data || [],
      budget_ranges: budget_ranges?.value?.data || [],
    };
  }
}

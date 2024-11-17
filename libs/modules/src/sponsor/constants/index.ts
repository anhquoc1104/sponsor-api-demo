export * from './pacakage.constant';
export * from './sponsor.constant';

export const VERIFY_PROPERTIES = [
  'sponsor_name',
  // "production_status",
  'cover_image',
  'banner_image',
  'introduction_images',
  'sponsor_categories',
  // 'sponsor_hashtags',
  'casts',
  'platforms',
  'sponsorship_forms',
  'sponsor_schedulers',
  'sponsorship_packages',
  'sponsor_kpi',
  'short_description',
  'detailed_description',
  'sponsorship_expiration_date',
  'start_date',
  'end_date',
  'product_limited_is_limit',
  'product_limited_description',
];

export const DRAFT_PROPERTIES = [
  {
    key: 'platforms',
    values: ['platform'],
  },
  {
    key: 'sponsorship_forms',
    values: ['sponsorship_form'],
  },
  {
    key: 'sponsorship_packages',
    values: ['package_name', 'package_unit', 'package_value', 'status'],
  },
];

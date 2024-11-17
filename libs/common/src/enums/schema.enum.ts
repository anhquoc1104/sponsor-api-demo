export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NO_MENTION = 'NO_MENTION',
}

export enum ACCOUNT_TYPE {
  ADMIN = 'ADMIN',
  PUBLISHER = 'PUBLISHER',
  CLIENT = 'CLIENT',
}

export enum COLLECTION {
  USER = 'users',
  SPONSOR = 'sponsors',
  MASTER_DATA = 'master_datas',
  GROUP = 'groups',
  SETTING = 'settings',
  ATTRIBUTE_CAST = 'attribute_casts',
  ATTRIBUTE_CAST_PROFESSION = 'attribute_cast_professions',
  ATTRIBUTE_CATEGORY = 'attribute_categories',
  ATTRIBUTE_HASHTAG = 'attribute_hashtags',
  ATTRIBUTE_PLATFORM = 'attribute_platforms',
  ATTRIBUTE_SPONSORSHIP_BENEFIT = 'attribute_sponsorship_benefits',
  ATTRIBUTE_SPONSORSHIP_FORM = 'attribute_sponsorship_forms',
  ATTRIBUTE_BUDGET_RANGE = 'attribute_budget_ranges',
  BLACKLIST = 'blacklist',
  SESSION = 'sessions',
  SPONSOR_LOG = 'sponsor_logs',
}

export enum POPULATE {
  USER = 'username email type',
  GROUP = 'type description name',
}

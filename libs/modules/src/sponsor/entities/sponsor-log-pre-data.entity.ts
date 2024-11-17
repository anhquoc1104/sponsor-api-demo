export class SponsorLogPreDataEntity {
  constructor(object: any) {
    this.sponsor_name = object?.sponsor_name;
    this.display_status = object?.display_status;
    this.sponsorship_status = object?.sponsorship_status;
    this.production_status = object?.production_status;
    this.cover_image = object?.cover_image;
    this.banner_image = object?.banner_image;
    this.introduction_images = object?.introduction_images;
    this.sponsor_categories = object?.sponsor_categories;
    this.sponsor_hashtags = object?.sponsor_hashtags;
    this.casts = object?.casts;
    this.platforms = object?.platforms;
    this.sponsorship_forms = object?.sponsorship_forms;
    this.sponsor_schedulers = object?.sponsor_schedulers;
    this.sponsorship_packages = object?.sponsorship_packages;
    this.sponsor_kpi = object?.sponsor_kpi;
    this.short_description = object?.short_description;
    this.detailed_description = object?.detailed_description;
    this.sponsorship_expiration_date = object?.sponsorship_expiration_date;
    this.start_date = object?.start_date;
    this.end_date = object?.end_date;
    this.user_approved = object?.user_approved;
    this.approved_date = object?.approved_date;
    this.product_limited_is_limit = object?.product_limited_is_limit;
    this.product_limited_description = object?.product_limited_description;
    this.priority = object?.priority;
    this.reason_rejected = object?.reason_rejected;
  }

  sponsor_name: string;
  display_status: string;
  sponsorship_status: string;
  production_status: string;
  cover_image: string;
  banner_image: string;
  introduction_images: string[];
  sponsor_categories: string;
  sponsor_hashtags: any;
  casts: any;
  platforms: any;
  sponsorship_forms: any;
  sponsor_schedulers: any;
  sponsorship_packages: any;
  sponsor_kpi: string;
  short_description: string;
  detailed_description: string;
  sponsorship_expiration_date: Date;
  start_date: Date;
  end_date: Date;
  user_approved: string;
  approved_date: Date;
  product_limited_is_limit: Boolean;
  product_limited_description: string;
  priority: number;
  reason_rejected: any;
}

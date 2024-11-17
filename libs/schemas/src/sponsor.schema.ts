import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DisplayStatus,
  SponsorshipStatus,
  ProductionStatus,
} from '../../modules/src/sponsor/enums';
import { BaseSchema } from './base';
import { ENUM_CURRENCY_UNIT } from '@app/common';

@Schema({ _id: true, versionKey: false })
class SponsorSchedulerSchema {
  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  event_time: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: [{ time: String, description: String }] })
  schedule_details: { time: string; description: string }[];
}

@Schema({ _id: false, versionKey: false })
class SponsorRejectedHistory {
  @Prop({
    type: String,
    trim: true,
  })
  reason: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  refuser: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date })
  created_at: Date;
}

@Schema({ _id: false, versionKey: false })
class platformSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refs: 'AttributePlatform',
  })
  platform: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, trim: true })
  link: string;
}

@Schema({ _id: false, versionKey: false })
class SponsorshipFormSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refs: 'AttributeSponsorshipForm',
  })
  sponsorship_form: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, trim: true })
  media: string;
}

class SponsorshipPackageSchema {
  @Prop({ type: String })
  package_name: string; // Tên gói

  @Prop({ type: String, default: ENUM_CURRENCY_UNIT.VND })
  package_unit: string;

  @Prop({ type: Number })
  package_value: number; // Giá trị gói

  @Prop({ type: Boolean, default: false })
  status: boolean; // Trạng thái true/false

  @Prop({ type: String })
  file: string; // path của các file
}

@Schema({ versionKey: false })
export class Sponsor extends BaseSchema {
  @Prop({ type: String, trim: true })
  sponsor_name: string; // tên chương trình

  @Prop({
    type: String,
    enum: Object.values(DisplayStatus),
    default: DisplayStatus.DRAFT,
  })
  display_status: string; // status hiển thị

  @Prop({
    type: String,
    enum: Object.values(SponsorshipStatus),
  })
  sponsorship_status: string; // trạng thái tài trợ

  @Prop({
    type: String,
    enum: Object.values(ProductionStatus),
    default: ProductionStatus.PLANNING,
  })
  production_status: string; // trạng thái sản xuất

  @Prop({ type: String, trim: true })
  cover_image: string;

  @Prop({ type: String, trim: true })
  banner_image: string;

  @Prop({ type: [String], trim: true })
  introduction_images: string[];

  // @Prop({ type: [String], trim: true })
  // introduction_medias: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, refs: 'AttributeCategory' })
  sponsor_categories: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], refs: 'AttributeHashtag' })
  sponsor_hashtags: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], refs: 'AttributeCast' })
  casts: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: [platformSchema],
  })
  platforms: platformSchema[]; // nền tảng

  @Prop({
    type: [SponsorshipFormSchema],
  })
  sponsorship_forms: SponsorshipFormSchema[];

  @Prop({
    type: [SponsorSchedulerSchema],
    required: false,
    default: [],
  })
  sponsor_schedulers: SponsorSchedulerSchema[];

  @Prop({ type: [SponsorshipPackageSchema] })
  sponsorship_packages: SponsorshipPackageSchema[];

  @Prop({ type: String })
  sponsor_kpi: string;

  @Prop({ type: String, trim: true })
  short_description: string;

  @Prop({ type: String, trim: true })
  detailed_description: string;

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
  })
  sponsorship_expiration_date: Date;

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
  })
  start_date: Date;

  @Prop({
    type: Date,
    timezone: 'Asia/Ho_Chi_Minh',
  })
  end_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_approved: string;

  @Prop({ type: Date })
  approved_date: Date;

  @Prop({ type: Boolean, default: false })
  product_limited_is_limit: boolean; // Trạng thái true/false

  @Prop({ type: String, default: '' })
  product_limited_description: String;

  @Prop({ type: Number, default: null })
  priority: number | null;

  @Prop({ type: [SponsorRejectedHistory] })
  rejected_histories: SponsorRejectedHistory[];

  @Prop({ type: SponsorRejectedHistory })
  reason_rejected: SponsorRejectedHistory;
}

export type SponsorDocument = mongoose.HydratedDocument<Sponsor>;

export interface ISponsor extends Sponsor {
  _id?: string | any;
}

export interface IReject extends SponsorRejectedHistory {}

export const SponsorSchema = SchemaFactory.createForClass(Sponsor);

// function validateSponsor(sponsor: any, next: Function) {
//   if (sponsor.display_status !== DisplayStatus.DRAFT) {
//     const requiredFields = [
//       'sponsor_name',
//       'cover_image',
//       'sponsor_categories',
//       'sponsor_hashtags',
//       'sponsorship_expiration_date',
//       'start_date',
//       'end_date',
//       'detailed_description',
//       'sponsorship_forms',
//       'platforms',
//       'sponsorship_packages',
//       'sponsor_schedulers',
//       'short_description',
//       'sponsor_kpi',
//       'banner_image',
//       'introduction_images',
//     ];

//     const missingFields = requiredFields.filter((field) => !sponsor[field]);

//     if (missingFields.length > 0) {
//       return next(
//         new Error(`Missing required fields: ${missingFields.join(', ')}`),
//       );
//     }

//     // Kiểm tra 'platforms'
//     if (!sponsor.platforms || sponsor.platforms.length === 0) {
//       return next(new Error('Platforms array is required and cannot be empty'));
//     }
//     sponsor.platforms.forEach(
//       (
//         e: { platform: mongoose.Types.ObjectId; link: string },
//         index: number,
//       ) => {
//         if (!e.platform || !mongoose.Types.ObjectId.isValid(e.platform)) {
//           return next(
//             new Error(`Platform at index ${index} is invalid or missing`),
//           );
//         }
//         if (!e.link || typeof e.link !== 'string') {
//           return next(
//             new Error(`Platform link at index ${index} is missing or invalid`),
//           );
//         }
//       },
//     );

//     // Kiểm tra 'sponsorship_forms'
//     if (!sponsor.sponsorship_forms || sponsor.sponsorship_forms.length === 0) {
//       return next(new Error('Platforms array is required and cannot be empty'));
//     }
//     sponsor.sponsorship_forms.forEach(
//       (
//         form: { sponsorship_form: mongoose.Types.ObjectId; media: string },
//         index: number,
//       ) => {
//         if (
//           !form.sponsorship_form ||
//           !mongoose.Types.ObjectId.isValid(form.sponsorship_form)
//         ) {
//           return next(
//             new Error(
//               `Sponsorship form at index ${index} is invalid or missing`,
//             ),
//           );
//         }
//         if (!form.media || typeof form.media !== 'string') {
//           return next(
//             new Error(
//               `Sponsorship form media at index ${index} is missing or invalid`,
//             ),
//           );
//         }
//       },
//     );

//     // Kiểm tra 'sponsorship_packages'
//     if (
//       !sponsor.sponsorship_packages ||
//       sponsor.sponsorship_packages.length === 0
//     ) {
//       return next(
//         new Error('sponsorship_packages array is required and cannot be empty'),
//       );
//     }
//     sponsor.sponsorship_packages.forEach(
//       (
//         pkg: {
//           package_name: string;
//           package_value: number;
//           status: boolean;
//           file: string;
//         },
//         index: number,
//       ) => {
//         if (!pkg.package_name || typeof pkg.package_name !== 'string') {
//           return next(
//             new Error(
//               `Sponsorship package name at index ${index} is missing or invalid`,
//             ),
//           );
//         }
//         if (pkg.status === undefined || typeof pkg.status !== 'boolean') {
//           return next(
//             new Error(
//               `Sponsorship package status at index ${index} is missing or invalid`,
//             ),
//           );
//         }
//         if (typeof pkg.package_value !== 'number') {
//           return next(
//             new Error(
//               `Sponsorship package value at index ${index} is missing or invalid`,
//             ),
//           );
//         }
//       },
//     );

//     // Kiểm tra 'sponsor_schedulers'
//     if (sponsor.sponsor_schedulers && sponsor.sponsor_schedulers.length > 0) {
//       sponsor.sponsor_schedulers.forEach(
//         (
//           scheduler: {
//             event_time: string;
//             location: string;
//             notes: string;
//             schedule_details: { time: string; description: string }[];
//           },
//           index: number,
//         ) => {
//           if (
//             !scheduler.event_time ||
//             typeof scheduler.event_time !== 'string'
//           ) {
//             return next(
//               new Error(
//                 `Scheduler event time at index ${index} is missing or invalid`,
//               ),
//             );
//           }
//           if (
//             scheduler.schedule_details &&
//             scheduler.schedule_details.length > 0
//           ) {
//             scheduler.schedule_details.forEach((detail, detailIndex) => {
//               if (!detail.time || typeof detail.time !== 'string') {
//                 return next(
//                   new Error(
//                     `Schedule detail time at index ${index}, detail ${detailIndex} is missing or invalid`,
//                   ),
//                 );
//               }
//               if (
//                 !detail.description ||
//                 typeof detail.description !== 'string'
//               ) {
//                 return next(
//                   new Error(
//                     `Schedule detail description at index ${index}, detail ${detailIndex} is missing or invalid`,
//                   ),
//                 );
//               }
//             });
//           }
//         },
//       );
//     }
//     if (
//       sponsor.sponsorship_packages &&
//       sponsor.sponsorship_packages.length > 0
//     ) {
//       const statuses = sponsor.sponsorship_packages.map((pkg) => pkg.status);
//       const falseCount = statuses.filter((status) => status === false).length;
//       const trueCount = statuses.filter((status) => status === true).length;

//       if (falseCount === 0) {
//         sponsor.sponsorship_status = SponsorshipStatus.FULL;
//       } else if (falseCount === 1) {
//         sponsor.sponsorship_status = SponsorshipStatus.ONE_SPONSORSHIP_POSITION;
//       } else if (falseCount >= 2 && trueCount >= 1) {
//         sponsor.sponsorship_status = SponsorshipStatus.SPONSORSHIP_AVAILABLE;
//       } else {
//         sponsor.sponsorship_status = SponsorshipStatus.NO_SPONSOR;
//       }
//     } else {
//       sponsor.sponsorship_status = SponsorshipStatus.NO_SPONSOR;
//     }

//     if (sponsor.sponsorship_expiration_date) {
//       try {
//         const sponsorId = sponsor._id; // Lấy ID của sponsor
//         const scheduler_url = process.env.SCHUDULER_API_URL;
//         axios
//           .post(`${scheduler_url}/v1/schedule/set-cron-jobs/${sponsorId}`)
//           .catch(function (error) {
//             if (error.response) {
//               // The request was made and the server responded with a status code
//               // that falls out of the range of 2xx
//               console.log(error.response.data);
//               console.log(error.response.status);
//               console.log(error.response.headers);
//             } else if (error.request) {
//               // The request was made but no response was received
//               // `error.request` is an instance of XMLHttpRequest in the browser
//               // and an instance of http.ClientRequest in node.js
//               console.log(error.request);
//             } else {
//               // Something happened in setting up the request that triggered an Error
//               console.log('Error', error.message);
//             }
//           });
//         console.log(`Cron jobs set for sponsorId: ${sponsorId}`);
//       } catch (error) {
//         next(new Error(`Failed to set cron jobs: ${error.message}`));
//       }
//     }
//   }

//   next();
// }

// SponsorSchema.pre('save', function (next) {
//   const sponsor = this as any;
//   validateSponsor(sponsor, next);
// });

// SponsorSchema.pre('findOneAndUpdate', function (next) {
//   const update = this.getUpdate();
//   const doc = this.getQuery();
//   const sponsor = { ...doc, ...update };
//   validateSponsor(sponsor, next);
// });

// SponsorSchema.pre('findOneAndUpdate', function (next) {
//   const update = this.getUpdate();
//   const doc = this.getQuery();
//   const sponsor = { ...doc, ...update };
//   validateSponsor(sponsor, next);
// });

// SponsorSchema.pre('updateOne', function (next) {
//   const update = this.getUpdate();
//   const doc = this.getQuery();
//   const sponsor = { ...doc, ...update };
//   validateSponsor(sponsor, next);
// });

// SponsorSchema.pre('updateMany', function (next) {
//   const update = this.getUpdate();
//   const doc = this.getQuery();
//   const sponsor = { ...doc, ...update };
//   validateSponsor(sponsor, next);
// });

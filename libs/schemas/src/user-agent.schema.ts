// import mongoose from 'mongoose';
// import { BaseSchema } from './base';

// const collection = 'user_agents';

// const AgentUserDeviceSchema = new mongoose.Schema(
//   {
//     device: {
//       type: mongoose.Schema.Types.Mixed,
//       default: null,
//     },
//     device_type: {
//       type: mongoose.Schema.Types.Mixed,
//       //   enum: [DEVICE_TYPE.MOBILE, DEVICE_TYPE.PORTAL],
//       //   default: DEVICE_TYPE.MOBILE,
//     },
//     model: {
//       type: String,
//       require: false,
//     },
//     os_version: {
//       type: String,
//     },
//     platform: {
//       type: String,
//       //   enum: MOBILE_PLATFORM,
//       require: false,
//     },
//   },
//   {
//     _id: false,
//     versionKey: false,
//   },
// );
// const columns = {
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true,
//   },
//   agent: {
//     type: AgentUserDeviceSchema,
//     required: true,
//   },
//   //Lần đăng nhập cuối cùng
//   last_login: {
//     type: Date,
//     default: null,
//     timezone: 'Asia/Ho_Chi_Minh',
//     index: true,
//   },
//   //Lần đăng xuất cuối cùng
//   last_logout: {
//     type: Date,
//     default: null,
//     timezone: 'Asia/Ho_Chi_Minh',
//     index: true,
//   },
//   //Trạng thái hoạt động của thiết bị
//   is_online: { type: Boolean, default: true },
// };

// export const UserAgentSchema = BaseSchema(columns, {
//   collection,
//   versionKey: false,
// });

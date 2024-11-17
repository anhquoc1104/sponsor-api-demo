import { ACTION, PERMISSION } from '../enums/permission.enum';

export const PERMISSION_FRAME = [
  {
    property: 'ACCOUNT',
    description: 'Admin Account (Tạo, chỉnh sửa, theo dõi tài khoản)',
    values: [
      {
        key: ACTION.CREATE,
        description: 'Tạo Tài Khoản',
        value: PERMISSION.CREATE_ACCOUNT,
      },
      {
        key: ACTION.UPDATE,
        description: 'Chỉnh Sửa Tài Khoản',
        value: PERMISSION.UPDATE_ACCOUNT,
      },
      {
        key: ACTION.VIEW,
        description: 'Theo Dõi Tài Khoản',
        value: PERMISSION.VIEW_ACCOUNT,
      },
      {
        key: ACTION.CREATE,
        description: 'Tạo Nhóm',
        value: PERMISSION.CREATE_GROUP,
      },
      {
        key: ACTION.CREATE,
        description: 'Chỉnh Sửa Nhóm',
        value: PERMISSION.UPDATE_GROUP,
      },
      {
        key: ACTION.VIEW,
        description: 'Theo Dõi Nhóm',
        value: PERMISSION.VIEW_GROUP,
      },
    ],
  },
  {
    property: 'SPONSOR',
    description: 'Admin Sponsor (Duyệt, chỉnh sửa, theo dõi bài sponsor)',
    values: [
      {
        key: ACTION.CREATE,
        description: 'Duyệt Bài Sponsor',
        value: PERMISSION.APPROVE_SPONSOR,
      },
      {
        key: ACTION.UPDATE,
        description: 'Chỉnh Sửa Bài Sponsor',
        value: PERMISSION.UPDATE_SPONSOR,
      },
      {
        key: ACTION.VIEW,
        description: 'Theo Dõi Bài Sponsor',
        value: PERMISSION.VIEW_SPONSOR,
      },
    ],
  },
  {
    property: 'REPORT',
    description: 'Admin Report (Thống kê về tài khoản và bài sponsor)',
    values: [
      {
        key: ACTION.REPORT,
        description: 'Thống kê về tài khoản',
        value: PERMISSION.REPORT_ACCOUNT,
      },
      {
        key: ACTION.REPORT,
        description: 'Thống kê về bài sponsor',
        value: PERMISSION.REPORT_SPONSOR,
      },
    ],
  },
  {
    property: 'CMS',
    description: 'Admin CMS (Soạn và chỉnh sửa bài viết trên Blog)',
    values: [
      {
        key: ACTION.CREATE,
        description: 'Soạn Bài Viết Trên Blog',
        value: PERMISSION.CREATE_BLOG,
      },
      {
        key: ACTION.UPDATE,
        description: 'Chỉnh Sửa Bài Viết Trên Blog',
        value: PERMISSION.UPDATE_BLOG,
      },
    ],
  },
];

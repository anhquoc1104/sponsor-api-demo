import { extname } from 'path';
import * as moment from 'moment';

export const fileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(
      /\.(jpg|jpeg|svg|png|pdf|doc|docx|xlsx|mp4|mkv|JPG|JPEG|SVG|PNG|PDF|DOC|DOCX|XLSX|MP4|MKV)$/,
    )
  ) {
    return callback(
      new Error('Không đúng định dạng hình ảnh hoặc tài liệu.'),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  const newFileName = `${moment().format('YYYYMMDDHHmmss')}${randomName}${extname(file.originalname)}`;

  callback(null, newFileName);
};

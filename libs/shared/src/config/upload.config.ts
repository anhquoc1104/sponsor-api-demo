import { diskStorage } from 'multer';
import * as moment from 'moment';
import * as fs from 'fs';
import { ENUM_DATE_TIME, editFileName, fileFilter } from '@app/common';

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let folder = 'documents';
      if (file.mimetype.startsWith('image/')) {
        folder = 'images';
      }

      const dir = `./public/${moment().format(ENUM_DATE_TIME.YYYY_MM_DD)}/${folder}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: editFileName,
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 52428800, // 50MB
  },
};

export default multerOptions;

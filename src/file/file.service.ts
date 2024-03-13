// file.service.ts
import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});
@Injectable()
export class FileService {
  fileDetails(
    file: Express.Multer.File,
    host: string | undefined,
  ): StoredFileDetails {
    console.log(file);
    return {
      url: `${host}/uploads/${file.filename}`,
      file,
      dir: __dirname,
    };
  }

  filesDetails(
    files: Express.Multer.File[],
    host: string | undefined,
  ): StoredFileDetails[] {
    return files?.map((file) => this.fileDetails(file, host));
  }
}

export type StoredFileDetails = {
  url: string;
  file: Express.Multer.File;
  dir: string;
};

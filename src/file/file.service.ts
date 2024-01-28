// file.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async saveFileToLocalDisk(file: Express.Multer.File) {
    try {
      if (!file.buffer) {
        throw new HttpException(
          'File Buffer expected but null is provided',
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(__dirname, '..', 'uploads', fileName);
      fs.writeFileSync(filePath, file.buffer);
      return { fileName };
    } catch (error) {
      return error;
    }
  }
}

// files.controller.ts
import { Controller } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', { storage }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  //   return {
  //     message: 'File uploaded successfully!',
  //     filename: file.filename,
  //     file,
  //     dir: __dirname,
  //   };
  // }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/file/file.service';
import { GetUser } from 'src/auth/GetUserDecorator';
import { imageWhitelist } from 'src/constants/file-whitelist/image';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Patch('proile-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
      fileFilter: (req, file, cb) => {
        if (!imageWhitelist.includes(file.mimetype)) {
          return cb(
            new UnprocessableEntityException('file is not in image type'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async setProfileImage(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.setUserProfileImage(user.id, file.path);
  }
}

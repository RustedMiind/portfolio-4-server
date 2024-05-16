import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Headers,
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
import { FileService, storage } from 'src/file/file.service';
import { GetUser } from 'src/auth/GetUserDecorator';
import { imageWhitelist } from 'src/constants/file-whitelist/image';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Get('create-admin-account')
  async createAdminAccount() {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      return await this.userService.createAdminAccount();
    } else
      throw new BadGatewayException(
        'Add Admin Credentials in the env variables',
      );
  }
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
    @Headers('host') host: string,
  ) {
    const imageDetails = this.fileService.fileDetails(file, host);
    return await this.userService.setUserProfileImage(
      user.id,
      imageDetails.url,
    );
  }
}

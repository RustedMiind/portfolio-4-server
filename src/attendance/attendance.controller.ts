import { User } from '@prisma/client';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateDto } from './dto/createDto';
import { GetUser } from 'src/auth/GetUserDecorator';

@UseGuards(AuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendService: AttendanceService) {}
  @Post('set-shift')
  async setShift(
    @Body(ValidationPipe) { end, start }: CreateDto,
    @GetUser() user: User,
  ) {
    return await this.attendService.createShift({ end, start, user });
  }

  @Delete(':shiftId')
  async deleteMyShift(
    @GetUser() user: User,
    @Param('shiftId', ParseIntPipe) shiftId: number,
  ) {
    return this.attendService.deleteShift(shiftId, user);
  }

  @Get('')
  async getMyShifts(
    @GetUser() user: User,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
  ) {
    return this.attendService.getUserShifts(user.id, { page, perPage: limit });
  }
}

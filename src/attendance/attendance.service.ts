import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import moment from 'moment';
import { PAGINATION_ORDER, paginate } from 'paginate-prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createShift({ end, user, start }: CreateShiftProps) {
    // Calculate the difference between start and end
    const dateDiff = moment(end).diff(moment(start)),
      workHours = dateDiff / (1000 * 60 * 60),
      hourlyRate = user.salary / (48 * 4);

    // Create and return the shift object
    const shift = await this.prisma.shift.create({
      data: {
        end,
        start,
        totalHours: workHours, // Use workHours directly
        pay: workHours * hourlyRate,
        userId: user.id,
      },
    });
    return shift;
  }

  async getUserShifts(userId: string, { page = 1, perPage = 10 }: Options) {
    const shifts = await paginate(this.prisma.shift)(
      { userId },
      {
        page,
        limit: perPage,
        sort: { field: 'start', order: PAGINATION_ORDER.DESC },
      },
    );

    let totalWorkHours = 0,
      totalPay = 0;

    shifts.data.forEach(({ pay, totalHours }) => {
      (totalWorkHours += totalHours), (totalPay += pay);
    });

    return { data: shifts, statistics: { totalWorkHours, totalPay } };
  }

  async deleteShift(shiftId: number, user?: User) {
    const shift = await this.prisma.shift.delete({
      where: { id: shiftId, userId: user?.id },
    });
    return shift;
  }
}

type CreateShiftProps = {
  start: string;
  end: string;
  user: User;
};

type Options = {
  page?: number;
  perPage?: number;
};

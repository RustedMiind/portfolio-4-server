import { Prisma } from '@prisma/client';

export type RequestUserType = Prisma.UserGetPayload<{
  include: {
    role: { include: { permissions: true } };
    createdProducts: true;
    orders: true;
  };
}>;

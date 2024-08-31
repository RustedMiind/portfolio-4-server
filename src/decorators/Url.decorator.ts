import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import getUrl from 'src/utils/getUrl';

export const Url = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return getUrl(request);
  },
);

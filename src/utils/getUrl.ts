import { Request } from 'express';

function getUrl(req: Request): string {
  return `${req.protocol}://${req.headers.host}`;
}

export default getUrl;

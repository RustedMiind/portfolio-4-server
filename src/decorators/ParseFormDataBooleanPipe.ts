import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFormDataBooleanPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'string') {
      value = value.trim().toLowerCase();
      if (value === 'true' || value === '1') {
        return true;
      } else if (value === 'false' || value === '0') {
        return false;
      } else {
        throw new BadRequestException(
          'Validation failed (boolean string is expected)',
        );
      }
    } else if (typeof value === 'number') {
      if (value === 1) {
        return true;
      } else if (value === 0) {
        return false;
      } else {
        throw new BadRequestException(
          'Validation failed (boolean number is expected)',
        );
      }
    } else if (typeof value === 'boolean') return value;
    else {
      throw new BadRequestException(
        'Validation failed (boolean value is expected)',
      );
    }
  }
}

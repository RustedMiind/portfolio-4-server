import { Product } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDto implements Partial<Product> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsNumberString()
  @IsOptional()
  priceAfterDiscount?: number;
}

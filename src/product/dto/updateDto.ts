import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDto implements Partial<Product> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  priceAfterDiscount?: number;
}

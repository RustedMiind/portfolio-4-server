import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LoginDto implements Partial<Product> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  Price: number;

  @IsNumberString()
  PriceAfterDiscount?: number;
}

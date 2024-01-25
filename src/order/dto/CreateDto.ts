import {
  IsArray,
  ValidateNested,
  IsUUID,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductItemDto {
  @IsUUID() // Validate id as a UUID
  id: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  count?: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];
}

import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class PaginationQueriesDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  perPage?: number;
}

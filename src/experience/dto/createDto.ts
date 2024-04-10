import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date: string;

  @IsOptional()
  @IsUUID()
  experienceId: string;

  @IsString()
  @IsNotEmpty()
  org_name: string;
}

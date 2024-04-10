import { Experience } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDto implements Partial<Experience> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsOptional()
  @IsDateString()
  @IsOptional()
  end_date: Date;

  @IsOptional()
  @IsUUID()
  experienceId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  org_name: string;
}

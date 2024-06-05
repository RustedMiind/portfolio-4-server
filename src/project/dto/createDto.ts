import { Project } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDto implements Partial<Project> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsOptional()
  @IsUUID()
  experienceId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  toolsIds: string[];

  @IsOptional()
  @IsBoolean()
  featured: boolean;
}

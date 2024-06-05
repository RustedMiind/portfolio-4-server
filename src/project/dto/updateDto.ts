import { Project } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDto implements Partial<Project> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
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

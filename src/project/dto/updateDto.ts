import { Project } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDto implements Partial<Project> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  link: string;

  @IsOptional()
  @IsUUID()
  experienceId: string;
}
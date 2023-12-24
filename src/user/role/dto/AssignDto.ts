import { IsNotEmpty, IsString } from 'class-validator';

export class AssignDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

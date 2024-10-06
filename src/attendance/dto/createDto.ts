import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  end: string;
}

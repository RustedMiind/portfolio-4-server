import { IsEnum, IsString } from 'class-validator';
import { Variables } from '../variables.enum';

export class SetVariableDto {
  @IsEnum(Variables)
  key: Variables;

  @IsString()
  value: string;
}

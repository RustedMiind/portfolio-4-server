import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { Variables } from './variables.enum';
import { SetVariableDto } from './dto/SetVariable.dto';
import { Permission } from 'src/user/permission/permission.decorator';
import { PermissionName } from 'src/user/permission/permission.enum';

@Controller('variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @Get('')
  async getAllVariables() {
    const variables = await this.variablesService.getAllVariable();
    const dtoObject: Record<string, string> = {};
    variables.forEach((variable) => {
      dtoObject[variable.key] = variable.value;
    });
    return dtoObject;
  }

  @Get('default')
  async getAllVariablesAsArray() {
    return { variables: await this.variablesService.getAllVariable() };
  }

  @Get(':key')
  async getVariable(
    @Param('key')
    key: Variables,
  ) {
    return await this.variablesService.getVariable(key);
  }

  @Permission(PermissionName.UPDATE_VARIABLE)
  @Post('')
  async setVariable(@Body() { key, value }: SetVariableDto) {
    return await this.variablesService.setVariable(key, value);
  }
}

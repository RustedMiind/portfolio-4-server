import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './dto/create-ninja-dto';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  getAllNinjas() {
    return this.ninjaService.GetAllNinjas();
  }

  @Get(':id')
  getNinjaById(@Param('id') id: string) {
    const numId = +id;
    if (numId) {
      return this.ninjaService.GetNinjaById(numId);
    } else {
      throw new HttpException('Please provide a valid Id', 404);
    }
  }

  @Post()
  createNewNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.CreateNewNinja(createNinjaDto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { DrinksService } from './drinks.service'
import { CreateDrinkDto } from './dto/create-drink.dto'

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  async create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinksService.create(createDrinkDto)
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.drinksService.findAll({
      search,
      category,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const drink = await this.drinksService.findOne(id)
    if (!drink) {
      throw new HttpException('Drink not found', HttpStatus.NOT_FOUND)
    }
    return drink
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { CategoriaService } from '../servide/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nome: string; descricao: string }) {
    return this.categoriaService.criar(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.categoriaService.findByNome(id);
  }

  @Get('search/by-nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Query('nome') nome: string) {
    return this.categoriaService.findByNome(nome);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() body: { nome?: string; descricao?: string },
  ) {
    return this.categoriaService.update(Number(id), body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.categoriaService.delete(Number(id));
  }
}

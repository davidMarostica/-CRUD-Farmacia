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

@Controller('categorias')
export class CategoriaController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nome: string; descricao: string }) {
    return { message: 'Categoria criada com sucesso!', categoria: body };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return [
      { id: 1, nome: 'Categoria A', descricao: 'Descrição A' },
      { id: 2, nome: 'Categoria B', descricao: 'Descrição B' },
    ];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return { id: Number(id), nome: 'Categoria X', descricao: 'Descrição X' };
  }

  @Get('search/by-nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Query('nome') nome: string) {
    return [{ id: 3, nome, descricao: 'Categoria filtrada por nome' }];
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() body: { nome?: string; descricao?: string },
  ) {
    return {
      message: 'Categoria atualizada com sucesso!',
      id: Number(id),
      ...body,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return { message: `Categoria ${id} deletada com sucesso!` };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    body: {
      nome: string;
      descricao: string;
      preco: number;
      quantidade: number;
      fabricante: string;
      dataValidade: string;
      categoria_id: number;
    },
  ) {
    return this.produtoService.criar(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number) {
    return this.produtoService.findById(id);
  }

  @Get('categoria/:categoriaId')
  @HttpCode(HttpStatus.OK)
  findByCategoria(@Param('categoriaId') categoriaId: number) {
    return this.produtoService.findByCategoria(categoriaId);
  }

  @Get('buscar/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string) {
    return this.produtoService.findByNome(nome);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: any) {
    return this.produtoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.produtoService.delete(id);
  }
}

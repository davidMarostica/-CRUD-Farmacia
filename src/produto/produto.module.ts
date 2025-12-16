import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entidade/produto.entity';
import { Categoria } from '../categoria/entidade/categoria.entity';
import { ProdutoController } from './cotroller/produto.controller';
import { ProdutoService } from './service/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}

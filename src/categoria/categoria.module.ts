import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './controller/categoria.controller';
import { Categoria } from './entidade/categoria.entity';
import { CategoriaService } from './servide/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule],
})
export class CategoriaModule {}

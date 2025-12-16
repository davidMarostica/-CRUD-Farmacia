import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entidade/categoria.entity';
import { CategoriaController } from './controller/categoria.controller';
import { CategoriaService } from './service/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule],
})
export class CategoriaModule {}

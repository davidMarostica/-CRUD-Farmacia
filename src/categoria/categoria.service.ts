import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entidade/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async criar(data: { nome: string; descricao: string }): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(data);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }

    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: { nome },
    });
  }

  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    const categoria = await this.findById(id);

    Object.assign(categoria, data);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.remove(categoria);
  }
}

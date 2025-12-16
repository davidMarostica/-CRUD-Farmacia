import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entidade/produto.entity';
import { Categoria } from '../../categoria/entidade/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async criar(data: {
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    fabricante: string;
    dataValidade: string;
    categoria_id: number;
  }): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: data.categoria_id },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria com ID ${data.categoria_id} não encontrada`,
      );
    }

    const produto = this.produtoRepository.create({
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      quantidade: data.quantidade,
      fabricante: data.fabricante,
      dataValidade: new Date(data.dataValidade),
      categoria: categoria,
    });

    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria'],
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return produto;
  }

  async findByCategoria(categoriaId: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }

  async update(
    id: number,
    data: Partial<Produto> & { categoria_id?: number },
  ): Promise<Produto> {
    const produto = await this.findById(id);

    if (data.categoria_id) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: data.categoria_id },
      });

      if (!categoria) {
        throw new NotFoundException(
          `Categoria com ID ${data.categoria_id} não encontrada`,
        );
      }

      produto.categoria = categoria;
      delete data.categoria_id;
    }

    Object.assign(produto, data);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    const produto = await this.findById(id);
    await this.produtoRepository.remove(produto);
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome },
      relations: ['categoria'],
    });
  }
}

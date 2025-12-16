import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entidade/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async criar(data: {
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  }): Promise<Cliente> {
    const emailExistente = await this.clienteRepository.findOne({
      where: { email: data.email },
    });

    if (emailExistente) {
      throw new Error('Email já cadastrado');
    }

    const cpfExistente = await this.clienteRepository.findOne({
      where: { cpf: data.cpf },
    });

    if (cpfExistente) {
      throw new Error('CPF já cadastrado');
    }

    const cliente = this.clienteRepository.create(data);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }

    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { email },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com email ${email} não encontrado`);
    }

    return cliente;
  }

  async findByCpf(cpf: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { cpf },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com CPF ${cpf} não encontrado`);
    }

    return cliente;
  }

  async findByNome(nome: string): Promise<Cliente[]> {
    return await this.clienteRepository
      .createQueryBuilder('cliente')
      .where('LOWER(cliente.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })
      .getMany();
  }

  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    const cliente = await this.findById(id);

    if (data.email && data.email !== cliente.email) {
      const emailExistente = await this.clienteRepository.findOne({
        where: { email: data.email },
      });

      if (emailExistente) {
        throw new Error('Email já cadastrado para outro cliente');
      }
    }

    if (data.cpf && data.cpf !== cliente.cpf) {
      const cpfExistente = await this.clienteRepository.findOne({
        where: { cpf: data.cpf },
      });

      if (cpfExistente) {
        throw new Error('CPF já cadastrado para outro cliente');
      }
    }

    Object.assign(cliente, data);
    return await this.clienteRepository.save(cliente);
  }

  async delete(id: number): Promise<void> {
    const cliente = await this.findById(id);
    await this.clienteRepository.remove(cliente);
  }
}

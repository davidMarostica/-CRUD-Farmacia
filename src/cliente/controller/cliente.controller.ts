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
  Query,
} from '@nestjs/common';
import { ClienteService } from '../service/cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    body: {
      nome: string;
      email: string;
      cpf: string;
      telefone?: string;
      endereco?: string;
      cidade?: string;
      estado?: string;
      cep?: string;
    },
  ) {
    return this.clienteService.criar(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number) {
    return this.clienteService.findById(id);
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('email') email: string) {
    return this.clienteService.findByEmail(email);
  }

  @Get('cpf/:cpf')
  @HttpCode(HttpStatus.OK)
  findByCpf(@Param('cpf') cpf: string) {
    return this.clienteService.findByCpf(cpf);
  }

  @Get('buscar/nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Query('nome') nome: string) {
    return this.clienteService.findByNome(nome);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: any) {
    return this.clienteService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.clienteService.delete(id);
  }
}

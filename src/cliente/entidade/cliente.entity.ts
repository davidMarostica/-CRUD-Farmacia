import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, nullable: false, unique: true })
  cpf: string;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 200 })
  endereco: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 10 })
  cep: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}

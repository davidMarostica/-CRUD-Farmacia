import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entidade/categoria.entity';

@Entity('tb_produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 500 })
  descricao: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  preco: number;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ length: 100 })
  fabricante: string;

  @Column({ type: 'date', nullable: false })
  dataValidade: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}

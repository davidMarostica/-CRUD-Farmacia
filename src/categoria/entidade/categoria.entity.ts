import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entidade/produto.entity';

@Entity('tb_categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}

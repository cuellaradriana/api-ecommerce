import { ApiProperty } from '@nestjs/swagger';
import { Product } from './products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @ApiProperty({
    description:
      'ID de la categoría en formato UUID versión 4, autogenerado por la base de datos',
    example: '3d6b6579-9a63-4e72-99b5-b857fb963265',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría, debe ser único en los registros',
    example: 'smartphone',
  })
  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Array de productos relacionados a la categoría',
  })
  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}

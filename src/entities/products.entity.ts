import { ApiProperty } from '@nestjs/swagger';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty({
    description:
      'ID de la Orden en formato UUID versión 4, autogenerado por la base de datos',
    example: '3d6b6579-9a63-4e72-99b5-b857fb963789',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Iphone 15',
  })
  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del Producto',
    example: 'The best smartphone in the world',
  })
  @Column('varchar')
  description: string;

  @ApiProperty({
    description: 'Precio del Producto, número flotante con dos decimales',
    example: 199.99,
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ApiProperty({
    description: 'Stock del Producto, número entero positivo',
    example: 12,
  })
  @Column('int')
  stock: number;

  @ApiProperty({
    description:
      'Categoría del producto, asociada por medio de relación con la entidad "Category"',
  })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @ApiProperty({
    description: 'URL de la Imagen de referencia del producto',
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  @Column({
    type: 'text',
    default:
      'https://images-cdn.ubuy.co.in/633a87dfd6b53a07f76e0444-ip12-pro-max-unlocked-smartphone-for.jpg',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Relación con las ordenes generadas con el producto',
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}

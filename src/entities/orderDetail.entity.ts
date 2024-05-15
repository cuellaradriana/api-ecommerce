import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from '../entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @ApiProperty({
    description:
      'ID del Detalle de la Orden en formato UUID versión 4, autogenerado por la base de datos',
    example: '3d6b6579-9a63-4e72-99b5-b857fb963123',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'Precio Total de la Orden Realizada, número flotante con dos decimales',
    example: 1099.99,
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ApiProperty({
    description: 'Relación entre los productos y los detalle de la orden ',
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'orderdetail_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @ApiProperty({
    description: 'Relación del detalle de la orden con la Orden de Compra',
  })
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn()
  order: Order;
}

import { User } from '../entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders',
})
export class Order {
  @ApiProperty({
    description:
      'ID de la Orden en formato UUID versión 4, autogenerado por la base de datos',
    example: '3d6b6579-9a63-4e72-99b5-b857fb963456',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'Fecha de la realización de la orden, generada al guardar el registro de la misma',
    example: '15/10/2024',
  })
  @Column('date')
  date: Date;

  @ApiProperty({
    description: 'Relación con el Usuario que ha realizado la orden',
  })
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty({
    description: 'Relación con el Detalle de la Orden',
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;
}

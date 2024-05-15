import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    description:
      'ID del Usuario en formato UUID versión 4, autogenerado por la base de datos',
    example: '3d6b6579-9a63-4e72-99b5-b857fb963012',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del Usuario',
    example: 'Adriana Cuellar',
  })
  @Column({
    length: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Email del Usuario',
    example: 'adriana@mail.com',
  })
  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password del Usuario encriptada',
    example: 'adriana@mail.com',
  })
  @Column({ type: 'char', length: 60 })
  password: string;

  @ApiProperty({
    description: 'Teléfono del Usuario',
    example: 1133334444,
  })
  @Column({ type: 'bigint' })
  phone: number;

  @ApiProperty({
    description: 'Dirección del Usuario',
    example: 'Cerrito 123',
  })
  @Column('varchar')
  address: string;

  @ApiProperty({
    description:
      'País de residencia del Usuario, no es estrictamente requerido',
    example: 'Argentina | null',
  })
  @Column({
    length: 50,
    nullable: true,
  })
  country: string;

  @ApiProperty({
    description:
      'Ciudad de residencia del Usuario, no es estrictamente requerida',
    example: 'Capital Federal | null',
  })
  @Column({
    length: 50,
    nullable: true,
  })
  city: string;

  @ApiProperty({
    description:
      'Rol del Usuario, asociado a si es Administrador o no. Se crea al momento del registro con un valor por defecto de "false"',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ApiProperty({
    description: 'Array de órdenes relacionadas con el usuario.',
  })
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[];
}

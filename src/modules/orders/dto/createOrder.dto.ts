import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductOrder {
  @ApiProperty({
    description: 'Debe ser un ID en formato UUID versión 4',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  @IsUUID(4, { message: 'El ID del producto no es un formato UUID' })
  id: string;
}
export class CreateOrderDto {
  @ApiProperty({
    description: 'Debe ser un ID en formato UUID versión 4',
    example: '120u8400-s29e-41r4-i716-446655440000',
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsUUID(4, { message: 'El ID del usuario no es un formato UUID' })
  userId: string;

  @ApiProperty({
    description: "Debe ser un array de objetos, con ID's de productos",
    example: [{ id: '550e8400-e29b-41d4-a716-446655440000' }],
  })
  @IsArray({ message: 'Los productos deben ir almacenados en un array' })
  @ArrayMinSize(1, { message: 'el array de productos no puede estar vacío' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];
}

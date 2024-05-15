import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 50 caracteres',
    example: 'Macbook Air 13 inch chip M2',
  })
  @IsNotEmpty({ message: 'El campo "name" no puede estar vacío' })
  @IsString({ message: 'El campo "name" debe ser un string' })
  @Length(3, 50, {
    message: 'El campo "name" debe tener entre 3 y 50 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string entre 8 y 150 caracteres',
    example:
      '2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera.',
  })
  @IsNotEmpty({ message: 'El campo "description" no puede estar vacío' })
  @IsString({ message: 'El campo "description" debe ser un string' })
  @Length(8, 150, {
    message: 'El campo "description" debe tener entre 8 y 150 caracteres',
  })
  description: string;

  @ApiProperty({
    description: 'Debe ser un número positivo con dos dígitos decimales',
    example: 999.99,
  })
  @IsNotEmpty({ message: 'El campo "price" no puede estar vacío' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El campo "price" debe ser un número con, máximo, dos decimales',
    },
  )
  @IsPositive({ message: 'El campo "price" debe ser un número positivo' })
  price: number;

  @ApiProperty({
    description: 'Debe ser un número entero, positivo mayor a 0',
    example: 12,
  })
  @IsNotEmpty({ message: 'El campo "stock" no puede estar vacío' })
  @IsInt({ message: 'El campo "stock" debe ser un número entero' })
  @IsPositive({ message: 'El campo "stock" debe ser un número positivo' })
  @Min(1, { message: 'No puedes agregar 0 unidades' })
  stock: number;

  @ApiProperty({
    description:
      'Debe ser un UUID en versión 4 correspondiente a la categoría a la que pertenece el producto',
    example: 'e547e7da-a820-489b-a3f7-d6e57e74871f',
  })
  @IsNotEmpty({ message: 'El campo "category" no puede estar vacío' })
  @IsUUID(4, { message: 'El campo "category" debe ser un UUID' })
  category: string;

  @ApiProperty({
    description:
      'Debe ser un string con un formato URL, que contenga la imagen referente del producto',
    example:
      'https://www.https://www.macstation.com.ar/img/productos/2960-1.jpg.com/images/products/image001',
  })
  @IsOptional()
  @IsUrl({}, { message: 'El campo "imgUrl" debe tener un formato válido' })
  imgUrl: string;
}

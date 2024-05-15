import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiHideProperty()
  @IsEmpty({ message: 'El campo "id" no debe ser ingresado' })
  id: string;

  @ApiHideProperty()
  @IsEmpty({ message: 'El campo "name" no debe ser ingresado' })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string entre 8 y 150 caracteres',
    example:
      '2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera.',
  })
  @IsOptional()
  @IsString({ message: 'El campo "description" debe ser un string' })
  @Length(8, 150, {
    message: 'El campo "description" debe tener entre 8 y 150 caracteres',
  })
  description: string;

  @ApiProperty({
    description: 'Debe ser un número positivo con dos dígitos decimales',
    example: 1099.99,
  })
  @IsOptional()
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
    example: 20,
  })
  @IsOptional()
  @IsInt({ message: 'El campo "stock" debe ser un número entero' })
  @IsPositive({ message: 'El campo "stock" debe ser un número positivo' })
  @Min(1, { message: 'No puedes agregar 0 unidades' })
  stock: number;

  @ApiHideProperty()
  @IsEmpty({ message: 'El campo "category" no debe ser ingresado' })
  category: string;

  @ApiProperty({
    description:
      'Debe ser un string con un formato URL, que contenga la imagen referente del producto',
    example:
      'https://www.macstation.com.ar/img/productos/2960-1.jpg://www.minube.com/images/products/image001',
  })
  @IsOptional()
  @IsUrl({}, { message: 'El campo "imgUrl" debe tener un formato válido' })
  imgUrl: string;
}

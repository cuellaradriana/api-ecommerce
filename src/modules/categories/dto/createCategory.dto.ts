import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 50 caracteres',
    example: 'notebooks',
  })
  @IsNotEmpty({ message: 'El campo "name" no puede estar vacío' })
  @IsString({ message: 'El campo "name" debe ser un string' })
  @Length(3, 50, { message: 'El campo "name" debe entre 3 y 50 caracteres' })
  @Matches(/^[^\d]+$/, {
    message: 'El campo "name" de la categoría no puede contener números',
  })
  name: string;
}

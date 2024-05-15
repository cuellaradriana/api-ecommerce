import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../../decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres',
    example: 'User Test',
  })
  @IsNotEmpty({ message: 'El campo "name" no puede estar vacío' })
  @IsString({ message: 'El campo "name" debe ser un string' })
  @Length(3, 80, {
    message: 'El campo "name" debe tener entre 3 y 80 caracteres',
  })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El campo "name" no puede contener números',
  })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string en formato de email',
    example: 'UserTest@mail.com',
  })
  @IsNotEmpty({ message: 'El campo "email" no puede estar vacío' })
  @IsEmail({}, { message: 'El campo "email" debe contener un formato válido.' })
  email: string;

  @ApiProperty({
    description:
      'Debe ser un string con una longitud entre 8 y 15 caracteres y debe contener 1 mayúscula, 1 minúscula, 1 dígito numérico y 1 carácter especial',
    example: 'Abcd0123!*',
  })
  @IsNotEmpty({ message: 'El campo "password" no puede estar vacío' })
  @IsString({ message: 'El campo "password" debe ser un string' })
  @Length(8, 15, {
    message: 'El campo "password" debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, {
    message: `El password debe contener al menos: 
      1 letra mayúscula.
      1 letra minúscula
      1 dígito numérico
      1 carácter especial entre: "!@#$%^&*"`,
  })
  password: string;

  @ApiProperty({
    description: 'Debe coincidir con la primer contraseña',
    example: 'Abcd0123!*',
  })
  @IsNotEmpty({ message: 'El campo "confirmPassword" no puede estar vacío' })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description:
      'Debe ser un número entero, positivo y con una longitud mínima de 7 dígitos',
    example: 1144445555,
  })
  @IsNotEmpty({ message: 'El campo "phone" no puede estar vacío' })
  @IsInt({ message: 'El campo "phone" debe ser un número entero' })
  @IsPositive({ message: 'El campo "phone" no puede ser un número negativo' })
  phone: number;

  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres',
    example: 'Calle Falsa 123',
  })
  @IsNotEmpty({ message: 'El campo "address" no puede estar vacío' })
  @IsString({ message: 'El campo "address" debe ser un string' })
  @Length(3, 80, {
    message: 'El campo "address" debe tener entre 3 y 80 caracteres',
  })
  address: string;

  @ApiProperty({
    description: 'Debe ser un string entre 4 y 20 caracteres',
    example: 'Cuba',
  })
  @IsOptional()
  @IsString({ message: 'El campo "country" debe ser un string' })
  @Length(4, 20, {
    message: 'El campo "country" debe tener entre 4 y 20 caracteres',
  })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El campo "country" no puede contener números',
  })
  country?: string;

  @ApiProperty({
    description: 'Debe ser un string entre 4 y 20 caracteres',
    example: 'Ciudad Bonita',
  })
  @IsOptional()
  @IsString({ message: 'El campo "city" debe ser un string' })
  @Length(4, 20, {
    message: 'El campo "city" no puede contener números',
  })
  city?: string;

  @ApiHideProperty()
  @IsEmpty({ message: 'El campo "isAdmin" no debe ser ingresado' })
  isAdmin?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginUserDto {
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
}

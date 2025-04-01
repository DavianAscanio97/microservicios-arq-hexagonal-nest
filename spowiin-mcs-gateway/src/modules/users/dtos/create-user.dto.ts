import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Juan', description: 'Primer nombre del usuario' })
    @IsString({ message: 'El campo primer nombre es requerido' })
    @Matches(/^[a-zA-Z0-9_-]*$/, { message: "El nombre solo puede contener letras y debe ser una sola palabra." })
    firstName: string;

    @ApiProperty({ example: 'Pérez', description: 'Primer apellido del usuario' })
    @IsString({ message: 'El campo primer apellido es requerido' })
    @Matches(/^[a-zA-Z0-9_-]*$/, { message:"El apellido solo puede contener letras y debe ser una sola palabra." })
    lastName: string;

    @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico del usuario' })
    @IsString({ message: 'El campo email es requerido' })
    @IsEmail({}, { message: 'El campo email no es válido' })
    @IsNotEmpty({ message: 'El campo email es requerido' })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Contraseña del usuario' })
    @IsString({ message: 'El campo contraseña es requerido' })
    @IsNotEmpty({ message: 'El campo contraseña es requerido' })
    password: string;

    @ApiProperty({ example: '12345678', description: 'Confirmación de la contraseña' })
    @IsString({ message: 'El campo confirmar contraseña es requerido' })
    @IsNotEmpty({ message: 'El campo confirmar contraseña es requerido' })
    confirmPassword: string;
}

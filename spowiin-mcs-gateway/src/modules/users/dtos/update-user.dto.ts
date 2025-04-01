import { IsString, IsNotEmpty, IsOptional, IsPhoneNumber, IsDate, IsEnum, IsUUID, IsDateString, Matches, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

/**
 * 📌 Enumeración para el campo `gender`
 */
export enum GenderEnum {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}

export class UpdateUserDto {
    @ApiProperty({
        example: 'a1b2c3d4e5',
        description: 'Identificador único del usuario',
    })
    @IsString({ message: 'El campo id debe ser un string' })
    @IsNotEmpty({ message: 'El campo id es obligatorio' })
    @IsUUID(4, { message: 'El identificador proporcionado no es válido' })
    id: string;

    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del usuario',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'El campo firstName debe ser un string' })
    firstName?: string;

    @ApiProperty({
        example: 'Pérez',
        description: 'Apellido del usuario',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'El campo lastName debe ser un string' })
    lastName?: string;

    @ApiProperty({
        example: '+34678543210',
        description: 'Número de teléfono del usuario (Formato internacional)',
        required: false
    })
    @IsOptional()
    @IsPhoneNumber(null, { message: 'El campo phoneNumber debe ser un número de teléfono válido' })
    phoneNumber?: string;

    @ApiProperty({
        example: 'male',
        description: 'Género del usuario (Opciones: male, female, other)',
        enum: GenderEnum,
        required: false
    })
    @IsOptional()
    @IsEnum(GenderEnum, { message: 'El campo gender debe ser male, female o other' })
    gender?: GenderEnum;

    @ApiProperty({
        example: '1990-05-20',
        description: 'Fecha de nacimiento del usuario (Formato: YYYY-MM-DD)',
        required: false
    })
    @IsOptional()
    @IsDateString({}, { message: 'El campo dateOfBirth debe ser una fecha válida en formato YYYY/MM/DD' })
    @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
        message: 'El campo dateOfBirth debe tener el formato YYYY/MM/DD (Ejemplo: 1997/09/12)',
    })
    @ValidateIf((dto) => dto.dateOfBirth && !moment(dto.dateOfBirth, 'YYYY/MM/DD', true).isValid(), {
        message: 'El campo dateOfBirth debe ser una fecha válida',
    })
    dateOfBirth?: string;
}

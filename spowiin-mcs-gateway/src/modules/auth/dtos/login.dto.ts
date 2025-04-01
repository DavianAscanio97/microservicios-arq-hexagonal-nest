import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'usuario@email.com' })
    @IsString()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    password: string;
}

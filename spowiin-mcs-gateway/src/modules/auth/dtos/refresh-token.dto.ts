import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ example: 'REFRESH_TOKEN' })
    @IsString()
    refreshToken: string;
}

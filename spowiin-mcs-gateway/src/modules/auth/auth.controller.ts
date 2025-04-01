import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/configuration/env/environments';
import { ClientProxy } from '@nestjs/microservices';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(@Inject(environment.authMicroserviceName) private readonly client: ClientProxy) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login (@Body() loginDto: LoginDto) {
    console.log('Login DTO:', loginDto);
    return await lastValueFrom(this.client.send({ cmd: 'login' }, loginDto));
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renovar token de acceso usando refresh token' })
  @ApiResponse({ status: 200, description: 'Token renovado correctamente.' })
  @ApiResponse({ status: 403, description: 'Refresh token inválido o expirado.' })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return {
      message: 'Token renovado exitosamente',
      data: {
        accessToken: 'NEW_JWT_ACCESS_TOKEN',
      },
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión del usuario' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente.' })
  logout() {
    return {
      message: 'Sesión cerrada exitosamente',
      data: null,
    };
  }

  @Get('validate/:token')
  @ApiOperation({ summary: 'Validar si un token es válido o no' })
  @ApiParam({ name: 'token', description: 'JWT que se desea validar' })
  @ApiResponse({ status: 200, description: 'Token válido.' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado.' })
  validateToken(@Param('token') token: string) {
    return {
      message: 'Token válido',
      data: {
        token,
      },
    };
  }
}

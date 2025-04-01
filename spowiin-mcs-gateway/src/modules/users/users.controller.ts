import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { environment } from 'src/configuration/env';
import { lastValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(@Inject(environment.userMicroserviceName) private readonly client: ClientProxy) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return await lastValueFrom(this.client.send({ cmd: 'create_user' }, createUserDto));
  }

  @Patch()
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
  async update(@Body() updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return await lastValueFrom(this.client.send({ cmd: 'update_user' }, updateUserDto));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id', new ParseUUIDPipe({
    exceptionFactory: () => new BadRequestException('El identificador proporcionado no es válido'),
  })) id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'get_user_by_id' }, { id: id }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  async remove(@Param('id', new ParseUUIDPipe({
    exceptionFactory: () => new BadRequestException('El identificador proporcionado no es válido'),
  })) id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'delete_user_by_id' }, { id: id }));

  }
}

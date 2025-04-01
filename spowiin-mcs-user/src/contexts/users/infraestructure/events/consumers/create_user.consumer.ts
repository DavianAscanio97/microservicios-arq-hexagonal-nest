
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/contexts/users/application/dtos/create-user.dto";
import { UserResponseDto } from "src/contexts/users/application/dtos/user-response.dto";
import { UserService } from "src/contexts/users/application/services/user.service";
@Injectable()
export class CreateUserConsumer {
    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'create_user' })
    async createUser(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        console.log('createUserDto', createUserDto);
        return await this.userService.createUser(createUserDto);
    }
}

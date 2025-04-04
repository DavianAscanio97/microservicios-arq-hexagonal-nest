
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/contexts/users/domain/dtos/create-user.dto";
import { UserResponseDto } from "src/contexts/users/domain/dtos/user-response.dto";
import { USER_SERVICE, UserService } from "src/contexts/users/domain/ports/user.services";
@Injectable()
export class CreateUserConsumer {
    constructor(@Inject(USER_SERVICE)
    private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'create_user' })
    async createUser(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        console.log('createUserDto', createUserDto);
        return await this.userService.createUser(createUserDto);
    }
}

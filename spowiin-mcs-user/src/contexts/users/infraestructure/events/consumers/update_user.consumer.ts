
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "src/contexts/users/application/dtos/user-response.dto";
import { UserService } from "src/contexts/users/application/services/user.service";
import { UpdateUserDto } from "src/contexts/users/application/dtos/update-user.dto";
@Injectable()
export class UpdateUserConsumer {
    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'update_user' })
    async updateUser(@Payload() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return await this.userService.updateUser(updateUserDto);
    }
}


import { MessagePattern, Payload } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { UserResponseDto } from "src/contexts/users/domain/dtos/user-response.dto";
import { UpdateUserDto } from "src/contexts/users/domain/dtos/update-user.dto";
import { USER_SERVICE, UserService } from "src/contexts/users/domain/ports/user.services";
@Injectable()
export class UpdateUserConsumer {
    constructor(@Inject(USER_SERVICE)
            private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'update_user' })
    async updateUser(@Payload() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return await this.userService.updateUser(updateUserDto);
    }
}

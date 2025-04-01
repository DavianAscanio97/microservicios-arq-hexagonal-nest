
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Injectable } from '@nestjs/common';
import { UserService } from "src/contexts/users/application/services/user.service";
import { FindUserByIdDto } from "src/contexts/users/application/dtos/find-user-by-id.dto";
@Injectable()
export class DeleteUserConsumer {
    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'delete_user_by_id' })
    async deleteUser(@Payload() findUserByIdDto: FindUserByIdDto): Promise<boolean> {
        return await this.userService.deleteUser(findUserByIdDto);
    }
}

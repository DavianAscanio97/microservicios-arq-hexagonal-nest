
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/contexts/users/application/services/user.service";
import { FindUserByIdDto } from "src/contexts/users/application/dtos/find-user-by-id.dto";
@Injectable()
export class GetUserByIdConsumer {
    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'get_user_by_id' })
    async getUser(@Payload() findUserByIdDto: FindUserByIdDto) {
        return await this.userService.getUser(findUserByIdDto);
    }
}

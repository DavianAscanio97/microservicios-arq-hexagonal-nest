
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { FindUserByIdDto } from "src/contexts/users/domain/dtos/find-user-by-id.dto";
import { USER_SERVICE, UserService } from "src/contexts/users/domain/ports/user.services";
@Injectable()
export class GetUserByIdConsumer {
    constructor(@Inject(USER_SERVICE)
    private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'get_user_by_id' })
    async getUser(@Payload() findUserByIdDto: FindUserByIdDto) {
        return await this.userService.getUser(findUserByIdDto);
    }
}

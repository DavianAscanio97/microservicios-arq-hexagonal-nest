import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/ports/user.repository";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { UserActions } from "../../domain/entities/user-actions";
import { FindUserByIdDto } from "../../domain/dtos/find-user-by-id.dto";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: UserRepository
    ) { }

    async execute(findUserByIdDto: FindUserByIdDto): Promise<boolean> {
        const user = await this._userRepository.findByUUId(findUserByIdDto.id);
        if (!user) {
            throw new UserNotFoundException();
        }
        UserActions.softDelete(user);
        await this._userRepository.update(user);
        await this._userRepository.publishEvents(user);
        return true;
    }
}

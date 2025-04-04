import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/ports/user.repository";
import { UserResponseDto } from "../../domain/dtos/user-response.dto";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { FindUserByIdDto } from "../../domain/dtos/find-user-by-id.dto";
import { UserActions } from "../../domain/entities/user-actions";
import { UserFactory } from "../../domain/entities/user-factory";


@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: UserRepository
    ) { }

    async execute(findUserByIdDto: FindUserByIdDto): Promise<UserResponseDto> {
        const user = await this._userRepository.findByUUId(findUserByIdDto.id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return UserFactory.toPublicUser(user);
    }
}

import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/repositories/user.repository";
import { UserResponseDto } from "../dtos/user-response.dto";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { FindUserByIdDto } from "../dtos/find-user-by-id.dto";
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

        // 🔹 Verificamos si el usuario está inactivo
        UserActions.checkInactiveUser(user);

        // 🔹 Verificamos si el usuario está bloqueado
        UserActions.checkBlockedUser(user);

        return UserFactory.toPublicUser(user);
    }
}

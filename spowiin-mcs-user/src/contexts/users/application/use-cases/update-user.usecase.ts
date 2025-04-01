import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/repositories/user.repository";

import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { UserResponseDto } from "../dtos/user-response.dto";
import { User } from "../../domain/entities/user.entity";
import { UserActions } from "../../domain/entities/user-actions";
import { FirstName } from '../../domain/value-objects/firstname.vo';
import { LastName } from "../../domain/value-objects/lastname.vo";
import { UserFactory } from "../../domain/entities/user-factory";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: UserRepository
    ) { }

    async execute(updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        // 🔹 Buscamos el usuario por su ID
        const user = await this._userRepository.findByUUId(updateUserDto.id);
        if (!user) {
            throw new UserNotFoundException();
        }
        // 🔹 Verificamos si el usuario está inactivo
        UserActions.checkInactiveUser(user);

        // 🔹 Verificamos si el usuario está bloqueado
        UserActions.checkBlockedUser(user);

        // 🔹 Actualizamos el usuario
        UserActions.update(user, {
            firstName: new FirstName(updateUserDto.firstName) ?? user.firstName,
            lastName: new LastName(updateUserDto.lastName) ?? user.lastName,
            gender: updateUserDto.gender ?? user.gender,
            dateOfBirth: updateUserDto.dateOfBirth ?? user.dateOfBirth,
            phoneNumber: updateUserDto.phoneNumber ?? user.phoneNumber
        });

        // Actualizamos última actividad
        UserActions.updateLastActivity(user);

        // Actualizamos última modificación
        UserActions.updateLastModification(user);

        // 📌 Persistimos los cambios en la base de datos
        await this._userRepository.update(user);

        // 📌 Publicamos los eventos de dominio
        await this._userRepository.publishEvents(user);

        // 📌 Retornamos el usuario actualizado
        return UserFactory.toPublicUser(user);
    }

}

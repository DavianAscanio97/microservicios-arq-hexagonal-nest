import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/ports/user.repository";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { UserFactory } from "../../domain/entities/user-factory";
import { UserResponseDto } from "../../domain/dtos/user-response.dto";

@Injectable()
export class CreateUserUseCase {

    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: UserRepository
    ) { }

    async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {

        // 🔹 Verificamos si el usuario ya existe
        const userExists = await this._userRepository.existsByEmail(createUserDto.email);
        if (userExists) {
            throw new UserAlreadyExistsException(createUserDto.email);
        }

        // 🔹 Creamos el usuario con los datos recibidos
        const newUser = UserFactory.create(createUserDto);

        // 📌 Guardamos el usuario en la base de datos
        await this._userRepository.create(newUser);

        // 📢 Publicamos el evento de creación
        await this._userRepository.publishEvents(newUser,{
            password: createUserDto.password,
            confirmPassword: createUserDto.confirmPassword
        });

        // 📌 Retornamos el usuario creado solo con propiedades publicas
        return UserFactory.toPublicUser(newUser);
    }
}

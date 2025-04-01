import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, USER_REPOSITORY_TOKEN } from "../../domain/repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { UserFactory } from "../../domain/entities/user-factory";
import { UserResponseDto } from "../dtos/user-response.dto";
import { UserActions } from "../../domain/entities/user-actions";
import { CryptoOpenSSL } from "src/common/plugins/openSSL/crypto.openssl";

@Injectable()
export class CreateUserUseCase {

    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly _userRepository: UserRepository,
        @Inject(CryptoOpenSSL)
        private readonly cryptoOpenSSL: CryptoOpenSSL,
    ) { }

    async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {

        // Verificar si la contraseña está cifrada
        createUserDto.password = this.cryptoOpenSSL.tryDecryptBase64(createUserDto.password).password;
        createUserDto.confirmPassword = this.cryptoOpenSSL.tryDecryptBase64(createUserDto.confirmPassword).password;

        //Verificamos si las contraseñas coinciden
        UserActions.checkCredentials(createUserDto.password, createUserDto.confirmPassword);

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
        await this._userRepository.publishEvents(newUser);

        // 📌 Retornamos el usuario creado solo con propiedades publicas
        return UserFactory.toPublicUser(newUser);
    }
}

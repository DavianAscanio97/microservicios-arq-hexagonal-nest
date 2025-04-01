import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "../use-cases/create-user.usecase";
import { GetUserUseCase } from "../use-cases/get-user.usecase";
import { UpdateUserUseCase } from "../use-cases/update-user.usecase";
import { DeleteUserUseCase } from "../use-cases/delete-user.usecase";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { FindUserByIdDto } from "../dtos/find-user-by-id.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        return this.createUserUseCase.execute(dto);
    }

    getUser(findUserByIdDto: FindUserByIdDto): Promise<UserResponseDto> {
        return this.getUserUseCase.execute(findUserByIdDto);
    }

    updateUser(updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return this.updateUserUseCase.execute(updateUserDto);
    }

    deleteUser(findUserByIdDto: FindUserByIdDto): Promise<boolean> {
        return this.deleteUserUseCase.execute(findUserByIdDto);
    }
}

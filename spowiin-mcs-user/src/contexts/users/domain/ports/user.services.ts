import { CreateUserDto } from "../dtos/create-user.dto";
import { FindUserByIdDto } from "../dtos/find-user-by-id.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
export const USER_SERVICE = "UserService";
export interface UserService {
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getUser(findUserByIdDto: FindUserByIdDto): Promise<UserResponseDto>;
    updateUser(updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(findUserByIdDto: FindUserByIdDto): Promise<boolean>;
}


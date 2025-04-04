import { User } from "../entities/user.entity";
export const USER_REPOSITORY_TOKEN = "UserRepository";
export interface UserRepository {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    publishEvents(user: User, extra?: object): Promise<void>;
    findByUUId(uuid: string): Promise<User | null>;
    existsByEmail(email: string): Promise<boolean>;
}


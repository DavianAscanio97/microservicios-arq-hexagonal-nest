import { User } from "../entities/user.entity";
export const USER_REPOSITORY_TOKEN = "UserRepository";
export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract update(user: User): Promise<void>;
    abstract publishEvents(user: User): Promise<void>;
    abstract findByUUId(uuid: string): Promise<User | null>;
    abstract existsByEmail(email: string): Promise<boolean>;
}


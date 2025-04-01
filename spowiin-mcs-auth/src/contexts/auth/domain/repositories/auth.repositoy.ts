import { Auth } from "../entities/auth.entity";

export const AUTH_REPOSITORY = "AuthRepository";

export abstract class AuthRepository {
    abstract login(): Promise<void>;
    abstract publishEvents(auth: Auth): Promise<void>;
}

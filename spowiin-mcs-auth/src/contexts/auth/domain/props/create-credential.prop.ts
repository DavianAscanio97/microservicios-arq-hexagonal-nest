import { AuthProvidersEnum } from "../enums/auth-providers.enum";
import { RolesEnum } from "../enums/roles.enum";

export type CreateCredentialProps = {
    id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    slug?: string;
    authProvider?: AuthProvidersEnum;
    role?: RolesEnum;
    lastActivityAt?: Date;
    emailVerifiedAt?: Date | null;
    phoneVerifiedAt?: Date | null;
    failedLoginAttempts?: number;
    lockedUntil?: Date | null;
    isActive?: boolean;
    isBlocked?: boolean;
    isVerified?: boolean;
    isSubscribed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
};
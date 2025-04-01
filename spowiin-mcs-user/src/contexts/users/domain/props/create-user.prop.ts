import { AuthProvidersEnum } from "../enums/auth-providers.enum";
import { RolesEnum } from "../enums/roles.enum";

export type CreateUserProps = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    slug?: string;
    authProvider?: AuthProvidersEnum;
    role?: RolesEnum;
    lastActivityAt?: Date;
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
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
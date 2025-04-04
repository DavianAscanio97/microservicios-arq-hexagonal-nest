
export type CreateUserProps = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
};
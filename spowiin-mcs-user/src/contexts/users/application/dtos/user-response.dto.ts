export class UserResponseDto {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly role: string,
        public readonly isActive: boolean,
        public readonly phoneNumber: string,
        public readonly avatarUrl: string,
        public readonly slug: string,
        public readonly dateOfBirth: string,
        public readonly gender: string,
        public readonly lastActivityAt: Date,
        public readonly createdAt: Date,
    ) { }
}

export class UserResponseDto {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly avatarUrl: string,
        public readonly dateOfBirth: string,
        public readonly gender: string,
        public readonly createdAt: Date,
    ) { }
}

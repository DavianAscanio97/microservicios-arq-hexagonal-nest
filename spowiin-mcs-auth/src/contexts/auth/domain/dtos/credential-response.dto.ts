export class CredentialResponseDto {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly role: string,
        public readonly isActive: boolean,
        public readonly slug: string,
        public readonly lastActivityAt: Date,
        public readonly createdAt: Date,
    ) { }
}

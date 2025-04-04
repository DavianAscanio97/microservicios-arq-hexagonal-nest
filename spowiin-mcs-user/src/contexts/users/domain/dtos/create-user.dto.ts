export class CreateUserDto {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public confirmPassword: string,
        public password: string
    ) { }
}

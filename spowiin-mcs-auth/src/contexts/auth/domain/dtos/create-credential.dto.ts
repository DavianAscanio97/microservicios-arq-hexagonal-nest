export class CreateCredentialDto {
    constructor(
        public readonly userId: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public confirmPassword: string,
    ) { }
}

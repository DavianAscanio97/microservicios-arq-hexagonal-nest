export class LoginDto {
    constructor(
        public readonly email: string,
        public password: string
    ) { }
}
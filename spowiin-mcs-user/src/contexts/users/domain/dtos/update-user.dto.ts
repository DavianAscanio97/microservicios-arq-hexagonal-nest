export class UpdateUserDto {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phoneNumber: string,
        public readonly gender: string,
        public readonly dateOfBirth: string,
    ) { }
}

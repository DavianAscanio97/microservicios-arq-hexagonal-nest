import { InvalidEmailException } from "../exceptions/invalid-email.exception";

export class Email {
    private readonly value: string;
    constructor(email: string) {
        if (!this.isValid(email)) {
            throw new InvalidEmailException(email);
        }
        this.value = email;
    }

    private isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getValue(): string {
        return this.value;
    }
}
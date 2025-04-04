import { InvalidLastNameException } from "../exceptions/invalid-lastname.exception";

export class LastName {
    private readonly value: string;

    constructor(lastName: string) {
        if (!LastName.isValid(lastName)) {
            throw new InvalidLastNameException("El apellido solo puede contener letras y debe ser una sola palabra.");
        }
        this.value = lastName;
    }

    static isValid(lastName: string): boolean {
        return /^[A-Za-z]+$/.test(lastName); // 🔹 Solo permite letras, sin espacios ni números.
    }

    getValue(): string {
        return this.value;
    }
}

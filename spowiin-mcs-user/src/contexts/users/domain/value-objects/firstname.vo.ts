
import { InvalidFirstNameException } from "../exceptions/invalid-firstname.exception";

export class FirstName {
    private readonly value: string;

    constructor(name: string) {
        if (!FirstName.isValid(name)) {
            throw new InvalidFirstNameException("El nombre solo puede contener letras y debe ser una sola palabra.");
        }
        this.value = name;
    }

    static isValid(name: string): boolean {
        return /^[A-Za-z]+$/.test(name); // 🔹 Solo permite letras, sin espacios ni números.
    }

    getValue(): string {
        return this.value;
    }
}

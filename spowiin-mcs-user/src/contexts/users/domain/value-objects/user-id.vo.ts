export class UserId {
    constructor(public readonly value: string) {
        if (!value) {
            throw new Error("El ID de usuario no puede estar vacío.");
        }
    }

    equals(other: UserId): boolean {
        return this.value === other.value;
    }
}


import { DomainEvent } from "../events/domain-event.interface";
import { Email } from "../value-objects/email.ov";
import { FirstName } from "../value-objects/firstname.vo";
import { LastName } from "../value-objects/lastname.vo";
import { Password } from "../value-objects/password.ov";

export class Credential {
    private domainEvents: DomainEvent[] = [];

    constructor(
        public readonly id: string,
        public readonly userId: string,
        public firstName: FirstName,
        public lastName: LastName,
        public email: Email,
        public password: Password,
        public slug: string,
        public authProvider: string = "email",
        public role: string = "user",
        public lastActivityAt: Date = new Date(),

        public emailVerifiedAt?: Date | null,
        public phoneVerifiedAt?: Date | null,
        public failedLoginAttempts: number = 0,
        public lockedUntil?: Date | null,

        public isActive: boolean = true,
        public isBlocked: boolean = false,
        public isVerified: boolean = false,
        public isSubscribed: boolean = false,

        public createdAt: Date = new Date(),
        public updatedAt?: Date,
        public deletedAt?: Date | null
    ) { }

    /**
     * 🔥 Agregar un evento de dominio a la lista interna.
     */
    addDomainEvent(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    /**
     * 📤 Obtener los eventos generados y limpiar la lista.
     */
    pullDomainEvents(): DomainEvent[] {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }

    get _email(): string {
        return this.email.getValue();
    }

    get _password(): string {
        return this.password.getValue();
    }

    get _firstName(): string {
        return this.firstName.getValue();
    }
    get _lastName(): string {
        return this.lastName.getValue();
    }
}

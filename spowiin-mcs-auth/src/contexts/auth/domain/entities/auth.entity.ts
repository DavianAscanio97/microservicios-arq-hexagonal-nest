import { DomainEvent } from "../events/domain-event.interface";
import { Email } from "../value-objects/email.ov";

export class Auth {
    private domainEvents: DomainEvent[] = [];

    constructor(
        public readonly id: string,
        public email: Email,
        public password: string,
    ) {
    }

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
}
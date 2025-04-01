import { DomainEvent } from "./domain-event.interface";

export class LoginEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly email: string,
    ) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return "LoginEvent";
    }
}

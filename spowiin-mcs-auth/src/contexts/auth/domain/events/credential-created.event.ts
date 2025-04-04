import { CredentialEventsEnum } from "../enums/events.enum";
import { DomainEvent } from "./domain-event.interface";

export class CredentialCreatedEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: string,
        public readonly email: string,
    ) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return CredentialEventsEnum.CREATED_CREDENTIAL;
    }
}

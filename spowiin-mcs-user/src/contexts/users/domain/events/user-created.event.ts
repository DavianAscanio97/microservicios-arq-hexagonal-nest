import { UserEventsEnum } from "../enums/events.enum";
import { DomainEvent } from "./domain-event.interface";

export class UserCreatedEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string
    ) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return UserEventsEnum.CREATED_USERS;
    }
}

import { UserEventsEnum } from "../enums/events.enum";
import { DomainEvent } from "./domain-event.interface";

export class UserUpdatedEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(public readonly userId: string) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return UserEventsEnum.UPDATED_USERS;
    }
}

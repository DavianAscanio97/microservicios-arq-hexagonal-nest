import { UserEventsEnum } from "../enums/events.enum";
import { DomainEvent } from "./domain-event.interface";

export class UserDeletedEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(public readonly userId: string) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return UserEventsEnum.DELETED_USERS;
    }
}

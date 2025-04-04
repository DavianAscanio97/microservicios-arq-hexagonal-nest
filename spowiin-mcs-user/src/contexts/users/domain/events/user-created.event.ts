
import { User } from "../entities/user.entity";
import { UserEventsEnum } from "../enums/events.enum";
import { DomainEvent } from "./domain-event.interface";

export class UserCreatedEvent implements DomainEvent {
    public readonly occurredAt: Date;

    constructor(public readonly user: User) {
        this.occurredAt = new Date();
    }

    getEventName(): string {
        return UserEventsEnum.CREATED_USERS;
    }
}

export interface DomainEvent {
    occurredAt: Date;
    getEventName(): string;
}

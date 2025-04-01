import { Auth } from "../../domain/entities/auth.entity";
import { AuthRepository } from "../../domain/repositories/auth.repositoy";

export class AuthDrizzlePersistence extends AuthRepository {
    login(): Promise<void> {
        return Promise.resolve();
    }
    /**
     * Simula la publicación de eventos de dominio.
    */
    async publishEvents(auth: Auth): Promise<void> {
        const events = auth.pullDomainEvents();
        for (const event of events) {
            console.log(`📢 Publicando evento: ${event.getEventName()} para usuario ${auth._email}`);
            // Aquí podríamos enviar el evento a un sistema de mensajería como Kafka, RabbitMQ, etc.
        }
    }


}
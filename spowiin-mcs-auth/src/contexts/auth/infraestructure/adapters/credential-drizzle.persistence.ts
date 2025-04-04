
import { db } from "src/common/plugins/drizzle/drizzle-client";
import { Credential } from "../../domain/entities/credential.entity";
import { CredentialRepository } from "../../domain/ports/credential.repositoy";
import { credentials } from "src/common/plugins/drizzle/schemas/credentials.schema";

export class DrizzleCredentialPersistence implements CredentialRepository {
    async create(credential: Credential): Promise<void> {
        console.log('OE PARCE UN SALUDO A TODOS DESDE AUTH')
        await db.insert(credentials).values({
            ...credential,
            firstName: credential._firstName,
            lastName: credential._lastName,
            email: credential._email,
            password: credential._password,
        });
    }
    login(): Promise<void> {
        return Promise.resolve();
    }
    /**
     * Simula la publicación de eventos de dominio.
    */
    async publishEvents(auth: Credential): Promise<void> {
        const events = auth.pullDomainEvents();
        for (const event of events) {
            console.log(`📢 Publicando evento: ${event.getEventName()} para usuario ${auth._email}`);
            // Aquí podríamos enviar el evento a un sistema de mensajería como Kafka, RabbitMQ, etc.
        }
    }


}

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "src/common/plugins/drizzle/drizzle-client";
import { users } from "src/common/plugins/drizzle/schemas/users.schema";
import { UserFactory } from "../../domain/entities/user-factory";
import { CreatedUserProducer } from "../events/producers/created-user.producers";
import { UserEventsEnum } from "../../domain/enums/events.enum";

@Injectable()
export class DrizzleUserRepository implements UserRepository {

    constructor(private readonly _createdUserProducer: CreatedUserProducer) { }

    /**
    * 📌 Guarda un nuevo usuario en la base de datos.
    *
    * Este método inserta un usuario en la base de datos a partir de una
    * instancia de `User`. Se encarga de transformar los `Value Objects`
    * (`Email` y `Password`) en valores primitivos antes de almacenarlos.
    *
    * @param {User} user - La entidad de usuario que se guardará en la base de datos.
    * @returns {Promise<void>} No devuelve ningún valor, simplemente ejecuta la inserción.
    */
    async create(user: User): Promise<void> {
        await db.insert(users).values({
            ...user,
            firstName: user._firstName,
            lastName: user._lastName,
            email: user._email,
            passwordHash: user._password,
        });
    }

    /**
    * 📌 Verifica si un usuario existe en la base de datos por su email.
    *
    * Este método busca un usuario por su email en la base de datos y
    * verifica si el campo `deletedAt` **NO es nulo**, lo que indica
    * que el usuario **fue eliminado previamente**.
    *
    * @param {string} email - El correo electrónico del usuario a verificar.
    * @returns {Promise<boolean>} `true` si el usuario existe y ha sido eliminado, `false` en caso contrario.
    */
    async existsByEmail(email: string): Promise<boolean> {
        const result = await db.select().from(users).where(
            and(
                eq(users.email, email),
                isNull(users.deletedAt)
            )
        )
            .limit(1);
        return result.length > 0;
    }

    /**
     * 📌 Actualiza los datos de un usuario en la base de datos.
     *
     * Este método toma una instancia de `User` y actualiza sus valores en la base de datos.
     * Asegura que los valores sensibles como `email` y `passwordHash` sean correctamente mapeados.
     *
     * @param {User} user - La entidad de usuario que se actualizará en la base de datos.
     * @returns {Promise<void>} - No devuelve ningún valor, solo ejecuta la actualización.
     */
    async update(user: User): Promise<void> {
        await db.update(users)
            .set({
                ...user,
                firstName: user._firstName,
                lastName: user._lastName,
                email: user._email,
                passwordHash: user._password,
            })
            .where(eq(users.id, user.id));
    }

    /**
     * 📌 Busca un usuario en la base de datos por su UUID.
     *
     * Este método consulta la base de datos para encontrar un usuario mediante su `id` único.
     * Si el usuario existe, lo reconstruye usando `UserFactory.restoreFromDatabase()`.
     *
     * @param {string} uuid - Identificador único del usuario (UUID).
     * @returns {Promise<User | null>} - Devuelve la entidad `User` si se encuentra, o `null` si no existe.
    */
    async findByUUId(uuid: string): Promise<User | null> {
        const result = await db.select().from(users)
        .where(
            and(
                eq(users.id, uuid),
                isNull(users.deletedAt)
            )
        )
        .limit(1);
        if (result.length === 0) return null;
        return UserFactory.fromPrimitives(result[0]);
    }

    /**
     * 📌 Busca un usuario en la base de datos por su dirección de correo electrónico.
     *
     * Este método consulta la base de datos para encontrar un usuario mediante su `email`.
     * Si el usuario existe, lo reconstruye usando `UserFactory.restoreFromDatabase()`.
     *
     * @param {string} email - Dirección de correo electrónico del usuario.
     * @returns {Promise<User | null>} - Devuelve la entidad `User` si se encuentra, o `null` si no existe.
     */
    async findByEmail(email: string): Promise<User | null> {
        const result = await db.select().from(users).where(
            and(
                eq(users.email, email),
                isNull(users.deletedAt)
            )
        ).limit(1);
        if (result.length === 0) return null;
        return UserFactory.fromPrimitives(result[0]);
    }

    /**
     * Simula la publicación de eventos de dominio.
    */
    async publishEvents(user: User): Promise<void> {
        const events = user.pullDomainEvents();
        for (const event of events) {
            if (event.getEventName() === UserEventsEnum.CREATED_USERS) await this._createdUserProducer.emitUserCreatedEvent(user);
            if (event.getEventName() === UserEventsEnum.UPDATED_USERS) await this._createdUserProducer.emitUserCreatedEvent(user);
            if (event.getEventName() === UserEventsEnum.DELETED_USERS) await this._createdUserProducer.emitUserCreatedEvent(user);
        }
    }

}

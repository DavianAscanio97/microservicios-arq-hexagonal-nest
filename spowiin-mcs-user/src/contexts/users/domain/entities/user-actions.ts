import { User } from "./user.entity";
import { UserUpdatedEvent } from "../events/user-updated.event";
import { UserDeletedEvent } from "../events/user-deleted.event";
import { Email } from "../value-objects/email.vo";
import { UserIsAlreadyDeletedException } from "../exceptions/user-is-already-deleted.exception";
import { CredentialsDoNotMatchException } from "../exceptions/credentials-do-not match.exception";
import { CreateCredentialUserProps } from "../props/create-credentials-user.prop";
import { UserCreatedEvent } from "../events/user-created.event";
export class UserActions {
    /**
     * 📌 Cambia el email del usuario asegurando validación.
     */
    static updateEmail(user: User, newEmail: string): void {
        user["email"] = new Email(newEmail);
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }
    
    /**
     * 📌 Elimina (soft delete) un usuario.
     */
    static softDelete(user: User): void {
        if (user.deletedAt) {
            throw new UserIsAlreadyDeletedException();
        }
        user.deletedAt = new Date();
        user.addDomainEvent(new UserDeletedEvent(user.id));
    }

    /**
     * 📌 Restaura un usuario eliminado.
     */
    static restore(user: User): void {
        user.deletedAt = null;
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }


    static update(user: User, updates: Partial<Omit<User, 'id' | 'domainEvents'>>): void {
        Object.assign(user, updates);
        user.updatedAt = new Date();
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }


}

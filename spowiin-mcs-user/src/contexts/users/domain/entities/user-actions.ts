import { User } from "./user.entity";
import { UserUpdatedEvent } from "../events/user-updated.event";
import { UserDeletedEvent } from "../events/user-deleted.event";
import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";
import { UserIsAlreadyDeletedException } from "../exceptions/user-is-already-deleted.exception";
import { CredentialsDoNotMatchException } from "../exceptions/credentials-do-not match.exception";
import { UserBlockedException } from "../exceptions/user-is-blocked.exception";
import { UserIsInactiveException } from "../exceptions/user-is-inactive.exception";

export class UserActions {
    /**
     * 📌 Cambia el email del usuario asegurando validación.
     */
    static updateEmail(user: User, newEmail: string): void {
        user["email"] = new Email(newEmail);
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }

    /**
     * 📌 Cambia la contraseña del usuario asegurando reglas de seguridad.
     */
    static changePassword(user: User, newPassword: string): void {
        user["password"] = new Password(newPassword);
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }

    /**
     * 📌 Bloquea a un usuario hasta una fecha específica.
     */
    static lockUntil(user: User, date: Date): void {
        if (date < new Date()) {
            throw new Error("La fecha de bloqueo debe ser en el futuro.");
        }
        user.lockedUntil = date;
        user.isBlocked = true;
    }

    /**
     * 📌 Desbloquea un usuario.
     */
    static unlock(user: User): void {
        user.lockedUntil = null;
        user.isBlocked = false;
    }

    /**
     * 📌 Incrementa los intentos fallidos de inicio de sesión.
     */
    static incrementFailedLoginAttempts(user: User): void {
        user.failedLoginAttempts += 1;
    }

    /**
     * 📌 Restablece los intentos fallidos de inicio de sesión.
     */
    static resetFailedLoginAttempts(user: User): void {
        user.failedLoginAttempts = 0;
    }

    /**
     * 📌 Verifica el email del usuario.
     */
    static verifyEmail(user: User): void {
        user.emailVerifiedAt = new Date();
        user.isVerified = true;
        user.addDomainEvent(new UserUpdatedEvent(user.id));
    }

    /**
     * 📌 Verifica el número de teléfono del usuario.
     */
    static verifyPhone(user: User): void {
        user.phoneVerifiedAt = new Date();
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

    /**
     * 📌 Verifica si las credenciales ingresadas son correctas.
     */
    static checkCredentials(password: string, confirmPassword: string): boolean {
        if (password !== confirmPassword) {
            throw new CredentialsDoNotMatchException();
        }
        return true;
    }

    /** 📌 Inactiva el usuario */
    static inactive(user: User): void {
        user.isActive = false;
    }


    // 📌 Verificamos si el usuario esta activo
    static checkInactiveUser(user: User): boolean {
        if (!user.isActive) {
            throw new UserIsInactiveException();
        }
        return true;
    }

    // 📌 Verificamos si el usuario esta bloqueado
    static checkBlockedUser(user: User): boolean {
        if (user.isBlocked) {
            throw new UserBlockedException();
        }
        return true;
    }

    // 📌 Actualizar última actividad
    static updateLastActivity(user: User): void {
        user.lastActivityAt = new Date();
    }

    // 📌 Actualizar última modificación
    static updateLastModification(user: User): void {
        user.updatedAt = new Date();
    }
}

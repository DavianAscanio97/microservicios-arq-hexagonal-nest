import { User } from "./user.entity";
import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";
import { UserCreatedEvent } from "../events/user-created.event";
import { LastName } from '../value-objects/lastname.vo';
import { FirstName } from '../value-objects/firstname.vo';
import { AuthProvidersEnum } from '../enums/auth-providers.enum';
import { RolesEnum } from '../enums/roles.enum';
import { CreateUserProps } from '../props/create-user.prop';
import { UserResponseDto } from "../../application/dtos/user-response.dto";
import { v4 as uuidv4 } from 'uuid';
export class UserFactory {
    /**
    * 📌 Crea un nuevo usuario desde un DTO asegurando reglas de negocio.
     */
    static create(props: CreateUserProps, isCreated = false): User {
        const user = new User(
            uuidv4(),
            new FirstName(props.firstName),
            new LastName(props.lastName),
            new Email(props.email),
            new Password(props.password, isCreated),
            this.generateSlug(props.firstName, props.lastName),
            props.authProvider ?? AuthProvidersEnum.EMAIL,
            props.role ?? RolesEnum.USER,
            props.lastActivityAt ?? new Date(),
            props.phoneNumber ?? null,
            props.avatarUrl ?? null,
            props.dateOfBirth ?? null,
            props.gender ?? null,
            props.emailVerifiedAt ?? null,
            props.phoneVerifiedAt ?? null,
            props.failedLoginAttempts ?? 0,
            props.lockedUntil ?? null,
            props.isActive ?? true,
            props.isBlocked ?? false,
            props.isVerified ?? false,
            props.isSubscribed ?? false,
            props.createdAt ?? new Date(),
            props.updatedAt,
            props.deletedAt ?? null
        );
        user.addDomainEvent(new UserCreatedEvent(user.id, user._firstName, user._lastName, user.email.getValue()));
        return user;
    }


    /**
    * 🔄 Crea un Usuario desde un DTO plano (ej. respuesta de la base de datos)
    */
    static fromPrimitives(data: any): User {
        return this.create({
            ...data,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        }, true);
    }

    /**
  * 📤 Convierte un Usuario en un objeto plano para retornar como DTO información pública
  */
    static toPublicUser(user: User): UserResponseDto {
        return {
            id: user.id,
            firstName: user._firstName,
            lastName: user._lastName,
            email: user._email,
            slug: user.slug,
            role: user.role,
            avatarUrl: user.avatarUrl,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            isActive: user.isActive,
            lastActivityAt: user.lastActivityAt,
            createdAt: user.createdAt,
        };
    }

    /**
     * 📌 Genera un slug único para un usuario.
     */
    static generateSlug(firstName: string, lastName: string): string {
        return `${firstName.toLowerCase().replace(/ /g, '')}-${lastName.toLowerCase().replace(/ /g, '')}-${Date.now()}`;
    }
}

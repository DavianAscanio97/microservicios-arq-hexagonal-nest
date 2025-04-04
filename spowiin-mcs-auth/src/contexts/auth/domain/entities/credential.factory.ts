import { Credential } from "./credential.entity";
import { CredentialCreatedEvent } from "../events/credential-created.event";
import { AuthProvidersEnum } from '../enums/auth-providers.enum';
import { RolesEnum } from '../enums/roles.enum';
import { CreateCredentialProps } from '../props/create-credential.prop';
import { v4 as uuidv4 } from 'uuid';
import { CredentialResponseDto } from "../dtos/credential-response.dto";
import { FirstName } from "../value-objects/firstname.vo";
import { LastName } from "../value-objects/lastname.vo";
import { Email } from "../value-objects/email.ov";
import { Password } from "../value-objects/password.ov";
export class CredentialFactory {
    /**
    * 📌 Crea un nuevo usuario desde un DTO asegurando reglas de negocio.
     */
    static create(props: CreateCredentialProps, isCreated = false): Credential {
        const credential = new Credential(
            uuidv4(),
            props.userId,
            new FirstName(props.firstName),
            new LastName(props.lastName),
            new Email(props.email),
            new Password(props.password, isCreated),
            this.generateSlug(props.firstName, props.lastName),
            props.authProvider ?? AuthProvidersEnum.EMAIL,
            props.role ?? RolesEnum.USER,
            props.lastActivityAt ?? new Date(),
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
        return credential;
    }


    /**
    * 🔄 Crea un Usuario desde un DTO plano (ej. respuesta de la base de datos)
    */
    static fromPrimitives(data: any): Credential {
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
    static toPublicUser(credential: Credential): CredentialResponseDto {
        return {
            id: credential.id,
            userId: credential.userId,
            firstName: credential._firstName,
            lastName: credential._lastName,
            email: credential._email,
            slug: credential.slug,
            role: credential.role,
            isActive: credential.isActive,
            lastActivityAt: credential.lastActivityAt,
            createdAt: credential.createdAt,
        };
    }

    /**
     * 📌 Genera un slug único para un usuario.
     */
    static generateSlug(firstName: string, lastName: string): string {
        return `${firstName.toLowerCase().replace(/ /g, '')}-${lastName.toLowerCase().replace(/ /g, '')}-${Date.now()}`;
    }
}

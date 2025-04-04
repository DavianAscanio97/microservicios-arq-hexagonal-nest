import { User } from "./user.entity";
import { Email } from "../value-objects/email.vo";
import { LastName } from '../value-objects/lastname.vo';
import { FirstName } from '../value-objects/firstname.vo';
import { CreateUserProps } from '../props/create-user.prop';
import { UserResponseDto } from "../dtos/user-response.dto";
import { v4 as uuidv4 } from 'uuid';
import { UserCreatedEvent } from "../events/user-created.event";
export class UserFactory {
    /**
    * 📌 Crea un nuevo usuario desde un DTO asegurando reglas de negocio.
     */
    static create(props: CreateUserProps): User {
        const user = new User(
            uuidv4(),
            new FirstName(props.firstName),
            new LastName(props.lastName),
            new Email(props.email),
            props.phoneNumber ?? null,
            props.avatarUrl ?? null,
            props.dateOfBirth ?? null,
            props.gender ?? null,
            props.createdAt ?? new Date(),
            props.updatedAt,
            props.deletedAt ?? null
        );
        user.addDomainEvent(new UserCreatedEvent(user));
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
        });
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
            avatarUrl: user.avatarUrl,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            createdAt: user.createdAt,
        };
    }

}

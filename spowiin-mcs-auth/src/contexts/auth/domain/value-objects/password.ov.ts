import * as bcrypt from 'bcryptjs';
import { InvalidPasswordException } from "../exceptions/invalid-password.exception";

export class Password {
    private readonly hashedPassword: string;
    private static readonly SALT_ROUNDS = 10;

    constructor(password: string, isHashed: boolean = false) {
        if (isHashed) {
            // Si la contraseña ya está hasheada, la guardamos directamente
            this.hashedPassword = password;
        } else {
            // Validamos y encriptamos la contraseña
            if (!Password.isValid(password)) {
                throw new InvalidPasswordException();
            }
            this.hashedPassword = Password.hashPassword(password);
        }
    }

    /**
     * 📌 Devuelve el hash de la contraseña
     */
    getValue(): string {
        return this.hashedPassword;
    }

    /**
     * 📌 Compara una contraseña en texto plano con el hash almacenado
     */
    comparePassword(plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, this.hashedPassword);
    }

    /**
     * 📌 Valida la seguridad de la contraseña antes de encriptarla
     */
    private static isValid(password: string): boolean {
        const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>_#-';
        const ESCAPED_SPECIALS = SPECIAL_CHARS.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        const REGEX = new RegExp(
            `^(?=.*[A-Z])(?=.*\\d)(?=.*[${ESCAPED_SPECIALS}])[\\p{L}\\d${ESCAPED_SPECIALS}]{8,}$`,
            'u'
        );
        return REGEX.test(password);
    }


    /**
     * 📌 Genera un hash seguro de la contraseña
     */
    private static hashPassword(password: string): string {
        return bcrypt.hashSync(password, Password.SALT_ROUNDS);
    }
}

import { CredentialBlockedException } from "../exceptions/credential-is-blocked.exception";
import { CredentialIsInactiveException } from "../exceptions/credential-is-inactive.exception";
import { CredentialsDoNotMatchException } from "../exceptions/credentials-do-not match.exception";
import { Password } from "../value-objects/password.ov";
import { Credential } from "./credential.entity";

export class CredentialActions {
   static login(auth: { email: string, password: string }) {
      console.log(`Logging in credential with email: ${auth.email}`);
   }


   /** 📌 Inactiva el usuario */
   static inactive(credential: Credential): void {
      credential.isActive = false;
   }


   // 📌 Verificamos si el usuario esta activo
   static checkInactiveCredential(credential: Credential): boolean {
      if (!credential.isActive) {
         throw new CredentialIsInactiveException();
      }
      return true;
   }

   // 📌 Verificamos si el usuario esta bloqueado
   static checkBlockedCredential(credential: Credential): boolean {
      if (credential.isBlocked) {
         throw new CredentialBlockedException();
      }
      return true;
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

   // 📌 Actualizar última actividad
   static updateLastActivity(credential: Credential): void {
      credential.lastActivityAt = new Date();
   }

   // 📌 Actualizar última modificación
   static updateLastModification(credential: Credential): void {
      credential.updatedAt = new Date();
   }


   /**
    * 📌 Cambia la contraseña del usuario asegurando reglas de seguridad.
    */
   static changePassword(credential: Credential, newPassword: string): void {
      credential["password"] = new Password(newPassword);
      //credential.addDomainEvent(new CredentialUpdatedEvent(credential.id));
   }

   /**
    * 📌 Bloquea a un usuario hasta una fecha específica.
    */
   static lockUntil(credential: Credential, date: Date): void {
      if (date < new Date()) {
         throw new Error("La fecha de bloqueo debe ser en el futuro.");
      }
      credential.lockedUntil = date;
      credential.isBlocked = true;
   }

   /**
    * 📌 Desbloquea un usuario.
    */
   static unlock(credential: Credential): void {
      credential.lockedUntil = null;
      credential.isBlocked = false;
   }

   /**
    * 📌 Incrementa los intentos fallidos de inicio de sesión.
    */
   static incrementFailedLoginAttempts(credential: Credential): void {
      credential.failedLoginAttempts += 1;
   }

   /**
    * 📌 Restablece los intentos fallidos de inicio de sesión.
    */
   static resetFailedLoginAttempts(credential: Credential): void {
      credential.failedLoginAttempts = 0;
   }

   /**
    * 📌 Verifica el email del usuario.
    */
   static verifyEmail(credential: Credential): void {
      credential.emailVerifiedAt = new Date();
      credential.isVerified = true;
      //credential.addDomainEvent(new CredentialUpdatedEvent(credential.id));
   }

   /**
    * 📌 Verifica el número de teléfono del usuario.
    */
   static verifyPhone(credential: Credential): void {
      credential.phoneVerifiedAt = new Date();
   }

}
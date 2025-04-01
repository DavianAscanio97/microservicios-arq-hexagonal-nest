import { environment } from "../environments";

/**
 * Token de identificación del microservicio de Usuarios.
 *
 * Utilizado para establecer y referenciar la comunicación
 * con el microservicio encargado de la gestión de usuarios.
 *
 * @constant
 * @type {string}
 * @default "MCS_USER_SERVICE"
 */
export const MCS_USER_SERVICE = environment.userMicroserviceName;

/**
 * Token de identificación del microservicio de Autenticación.
 *
 * Utilizado para establecer y referenciar la comunicación
 * con el microservicio encargado de la autenticación y autorización.
 *
 * @constant
 * @type {string}
 * @default "MCS_AUTH_SERVICE"
 */
export const MCS_AUTH_SERVICE = environment.authMicroserviceName;

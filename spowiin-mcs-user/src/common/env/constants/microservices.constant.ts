import { environment } from "../environments";

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

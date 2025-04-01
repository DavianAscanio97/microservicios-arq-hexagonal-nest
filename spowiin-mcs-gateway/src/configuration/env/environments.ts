import { EnvironmentVariables } from './interfaces/environments.interface';
import { environments } from './schema/environments.validation';

/**
 * Objeto tipado que contiene las variables de entorno validadas.
 */
const environmentVariables: EnvironmentVariables = environments;

/**
 * Variables de entorno principales utilizadas en la configuración de la aplicación.
 *
 * @example
 * - `serverPort`: Puerto del servidor HTTP.
 * - `usersMicroserviceHost`: Host del microservicio de Usuarios.
 * - `usersMicroservicePort`: Puerto del microservicio de Usuarios.
 */
export const environment = {
  /**
   * Puerto en el que el servidor HTTP escuchará las solicitudes.
   *
   * @type {number}
   * @example 3000
   */
  serverPort: environmentVariables.SERVER_PORT,

  /**
   * Host o dirección IP del microservicio de Usuarios.
   *
   * @type {string}
   * @example "localhost"
   */
  usersMicroserviceHost: environmentVariables.USERS_MICROSERVICE_HOST,

  /**
   * Nombre del microservicio de Usuarios.
   *
   * @type {string}
   * @example "users"
   */
  userMicroserviceName: environmentVariables.USERS_MICROSERVICE_NAME,

  /**
   * Puerto utilizado para conectarse al microservicio de Usuarios.
   *
   * @type {number}
   * @example 4001
   */
  usersMicroservicePort: environmentVariables.USERS_MICROSERVICE_PORT,

  /**
   * Nombre del microservicio de Auth.
   *
   * @type {string}
   * @example "auth"
   */
  authMicroserviceName: environmentVariables.AUTH_MICROSERVICE_NAME,


  /**
   * Puerto utilizado para conectarse al microservicio de Auth.
   *
   * @type {number}
   * @example 4002
   */
  authMicroservicePort: environmentVariables.AUTH_MICROSERVICE_PORT,


  /**
   * Nombre del microservicio de Auth.
   *
   * @type {string}
   * @example "auth"
   */
  authMicroserviceHost: environmentVariables.AUTH_MICROSERVICE_HOST,

  /**
   * Agentes permitidos para realizar solicitudes al servidor.
   *
   * @type {string}
   * @example "auth"
   */
  allowedAgents: environmentVariables.ALLOWED_AGENTS,


  /**
   * Entorno de ejecución de la aplicación.
   *
   * @type {string}
   * @example "development
   */
  nodeEnv: environmentVariables.NODE_ENV,

  /**
   * Llave base64 utilizada para encriptar y desencriptar datos.
   *
   * @type {string}
   * @example "development
   */
  base64Secret: environmentVariables.BASE64_SECRET,

  /**
   * Llave base64 utilizada para verificar la integridad de los datos.
   *
   * @type {string}
   * @example "development
   */
  base64Check: environmentVariables.BASE64_CHECK,

};

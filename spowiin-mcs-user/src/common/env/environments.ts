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
 * - `databaseUrl`: URL de conexión a la base de datos.
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
   * URL de conexión a la base de datos.
   *
   * @type {string}
   * @example mongodb://localhost:27017/my-database
   */
  databaseUrl: environmentVariables.DATABASE_URL,

  /**
   * Host de la base de datos.
   *
   * @type {string}
   * @example localhost
   */
  dbHost: environmentVariables.DB_HOST,

  /**
   * Puerto de la base de datos.
   *
   * @type {number}
   * @example 5432
   */
  dbPort: environmentVariables.DB_PORT,

  /**
   * Usuario de la base de datos.
   *
   * @type {string}
   * @example postgres
   */
  dbUser: environmentVariables.DB_USER,

  /**
   * Contraseña de la base de datos.
   *
   * @type {string}
   * @example password
   */
  dbPassword: environmentVariables.DB_PASSWORD,

  /**
   * Nombre de la base de datos.
   *
   * @type {string}
   * @example nestjs_drizzle
   */
  dbName: environmentVariables.DB_NAME,

  /**
   * Esquema de la base de datos.
   *
   * @type {string}
   * @example public
   */
  dbSchema: environmentVariables.DB_SCHEMA,

  /**
   * Clave secreta utilizada para firmar los tokens.
   *
   * @type {string}
   * @example 0293d...
   */

  hmacSecret: environmentVariables.HMAC_SECRET,


  authMicroserviceHost: environmentVariables.AUTH_MICROSERVICE_HOST,
  authMicroservicePort: environmentVariables.AUTH_MICROSERVICE_PORT,
  authMicroserviceName: environmentVariables.AUTH_MICROSERVICE_NAME,

};

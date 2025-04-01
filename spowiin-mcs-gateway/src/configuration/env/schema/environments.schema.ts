import 'dotenv/config';
import * as joi from 'joi';

/**
 * Esquema de validación para las variables de entorno de la aplicación.
 *
 * Este esquema valida:
 * - Configuración del servidor HTTP.
 * - Configuración del microservicio de Usuarios.
 * - Configuración del microservicio de Autenticación.
 */
export const environmentSchema = joi.object({
    /**
     * Puerto en el que el servidor HTTP escuchará las solicitudes.
     *
     * @type {number}
     * @example
     * 3000
     */
    SERVER_PORT: joi.number().required(),

    /**
     * Host o dirección IP del microservicio de Usuarios.
     *
     * @type {string}
     * @example "localhost"
     */
    USERS_MICROSERVICE_HOST: joi.string().required(),

    /**
     * Puerto del microservicio de Usuarios.
     *
     * @type {number}
     * @example
     * 4001
     */
    USERS_MICROSERVICE_PORT: joi.number().required(),

    /**
     * Nombre del microservicio de Usuarios.
     *
     * @type {string}
     * @example
     * "users"
     */
    USERS_MICROSERVICE_NAME: joi.string().required(),

    /**
     * Host o dirección IP del microservicio de Autenticación.
     *
     * @type {string}
     * @example
     * "localhost"
     */
    AUTH_MICROSERVICE_HOST: joi.string().required(),

    /**
     * Puerto del microservicio de Autenticación.
     *
     * @type {number}
     * @example
     * 4002
     */
    AUTH_MICROSERVICE_PORT: joi.number().required(),

    /**
     * Nombre del microservicio de Autenticación.
     *
     * @type {string}
     * @example
     * "auth"
     */
    AUTH_MICROSERVICE_NAME: joi.string().required(),

    /**
     * Agentes permitidos para realizar solicitudes a la API.
     *
     * @type {string}
     * @example
     * ""
     */
    ALLOWED_AGENTS: joi.string().required(),

    /**
     * Entorno de ejecución de la aplicación.
     *
     * @type {string}
     * @example
     * "development"
     */
    NODE_ENV: joi.string().required(),

    /**
     * Secret para la generación de tokens Base64.
     *
     * @type {string}
     * @example
     * "my-secret"
     */
    BASE64_SECRET: joi.string().required(),

    /**
     * Check para la verificación de tokens Base64.
     *
     * @type {string}
     * @example
     * "secure-v1"
     */
    BASE64_CHECK: joi.string().required(),
}).unknown(true);

/**
 * Validación de las variables de entorno utilizando el esquema definido.
 *
 * Si alguna variable requerida no está presente o no cumple con el tipo esperado,
 * se lanza un error detallando la causa.
 */
const { error, value } = environmentSchema.validate(process.env);

if (error) {
    throw new Error(`Ha ocurrido un error con las variables de entorno: ${error.message}`);
}

/**
 * Objeto que contiene las variables de entorno validadas
 * y listas para ser utilizadas de manera segura en la aplicación.
 */
export const environments = value;

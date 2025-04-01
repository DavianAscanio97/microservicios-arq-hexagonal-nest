import 'dotenv/config';
import * as joi from 'joi';

/**
 * Esquema de validación para las variables de entorno de la aplicación.
 *
 * Este esquema valida:
 * - Configuración del servidor HTTP.
 * - Configuración de la base de datos.
 */
export const environmentSchema = joi.object({

    SERVER_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_SCHEMA: joi.string().required(),
    HMAC_SECRET: joi.string().required(),

}).unknown(true);

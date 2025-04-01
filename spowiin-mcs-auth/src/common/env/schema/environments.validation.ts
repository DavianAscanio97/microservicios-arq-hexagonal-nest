import { environmentSchema } from "./environments.schema";

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
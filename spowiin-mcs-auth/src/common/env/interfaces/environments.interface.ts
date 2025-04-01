/**
 * Interfaz que representa las variables de entorno requeridas
 * para configurar y ejecutar correctamente la aplicación.
 */
export interface EnvironmentVariables {
  /**
   * Puerto en el que el servidor HTTP escuchará las solicitudes.
   *
   * @example
   * SERVER_PORT=3000
   */
  SERVER_PORT: number;

  /**
   * URL de conexión a la base de datos.
   *
   * @example
   * DATABASE_URL=mongodb://localhost:27017/my-database
   */
  DATABASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SCHEMA: string;
  HMAC_SECRET: string;

}

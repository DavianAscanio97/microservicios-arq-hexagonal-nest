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
   * Host o dirección IP del microservicio de Usuarios.
   *
   * @example
   * USERS_MICROSERVICE_HOST=localhost
   */
  USERS_MICROSERVICE_HOST: string;

  /**
   * Puerto utilizado para conectarse al microservicio de Usuarios.
   *
   * @example
   * USERS_MICROSERVICE_PORT=4001
   */
  USERS_MICROSERVICE_PORT: number;

  /**
   * Nombre del microservicio de Usuarios.
   *
   * @example
   * USERS_MICROSERVICE_NAME=users
   */
  USERS_MICROSERVICE_NAME: string;

  /**
   * Host o dirección IP del microservicio de Autenticación.
   *
   * @example
   * AUTH_MICROSERVICE_HOST=localhost
   */
  AUTH_MICROSERVICE_HOST: string;

  /**
   * Puerto utilizado para conectarse al microservicio de Autenticación.
   *
   * @example
   * AUTH_MICROSERVICE_PORT=4002
   */
  AUTH_MICROSERVICE_PORT: number;

  /**
   * Nombre del microservicio de Autenticación.
   *
   * @example
   * AUTH_MICROSERVICE_NAME=auth
   */
  AUTH_MICROSERVICE_NAME: string;

  /**
   * Agentes permitidos para realizar solicitudes a la API.
   *
   * @example
   * ALLOWED_AGENTS=
   */
  ALLOWED_AGENTS: string;


  /**
   * Entorno de ejecución de la aplicación.
   *
   * @example
   * NODE_ENV=development
   */
  NODE_ENV: string;

  /**
   * Llave base64 utilizada para encriptar y desencriptar datos.
   *
   * @example
   * BASE64_SECRET=secret
   */
  BASE64_SECRET: string;

  /**
   * Llave base64 utilizada para verificar la integridad de los datos.
   *
   * @example
   * BASE64_CHECK=secret
   */
  BASE64_CHECK: string;
}

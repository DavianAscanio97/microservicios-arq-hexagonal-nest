import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Spowiin Gateway API')
        .setDescription(
        `
        Spowiin Gateway API - Documentación Técnica

        Esta API funciona como el Gateway central del ecosistema Spowiin, una plataforma orientada a deportistas de todas las disciplinas, integrando múltiples servicios bajo una arquitectura basada en microservicios.

        Objetivo de la API:
        Centralizar y exponer los endpoints necesarios para que aplicaciones frontend, móviles o integraciones externas puedan comunicarse de manera eficiente y segura con los microservicios que conforman Spowiin.

        Servicios disponibles:
        - Gestión de rutinas y planes de entrenamiento.
        - Consulta de rutas deportivas para actividades como correr, ciclismo, fútbol, entre otros.
        - Administración de usuarios y búsqueda de rivales deportivos.
        - Organización de eventos y actividades deportivas.
        - Funcionalidades sociales como publicaciones, comentarios y redes de contacto entre deportistas.

        Características técnicas:
        - Arquitectura orientada a microservicios.
        - Comunicación interna mediante protocolos como gRPC, TCP y REST según cada caso.
        - Seguridad gestionada mediante autenticación JWT (Bearer Token).
        - Respuestas estandarizadas con una estructura común (status, code, message, data).
        - Validación estricta de datos utilizando class-validator y Joi.

        Uso recomendado:
        - Obtener un token JWT mediante el endpoint de autenticación.
        - Enviar el token en la cabecera Authorization como Bearer Token en cada solicitud protegida.
        - Consumir los módulos disponibles según las necesidades del cliente (web, app móvil o integraciones de terceros).

        Para más información, consulta los DTO, los tags de cada módulo o contacta con el equipo técnico encargado.
        `
        )
        .setVersion('1.0.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Ingresa el token JWT para autenticarte en los endpoints protegidos',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
}

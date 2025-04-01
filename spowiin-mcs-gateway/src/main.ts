import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { environment } from './configuration/env/environments';
import { setupCompression } from './configuration/middlewares/compression.middleware';
import { setupCors } from './configuration/middlewares/cors.middleware';
import { setupHelmet } from './configuration/middlewares/helmet.middleware';
import { setupGlobalPrefix } from './configuration/middlewares/prefix.middleware';
import { setupRateLimit } from './configuration/middlewares/rate-limit.middleware';
import { setupGlobalValidation } from './configuration/middlewares/validation.middleware';
import { setupExceptionFilter } from './configuration/middlewares/exception-filter.middleware';
import { setupResponseInterceptor } from './configuration/middlewares/response-interceptor.middleware';
import { setupSwagger } from './configuration/swagger/configuration.swagger';
import { setupVersioning } from './configuration/middlewares/versioning.middleware';
import { setupGlobalGuards } from './configuration/middlewares/guards.middleware';
import { setupCookieParser } from './configuration/middlewares/cookie-parser.middleware';
import { setupCsurfApp } from './configuration/middlewares/csrf.middleware';
import { setupUserAgentMiddleware } from './configuration/middlewares/user-agent.middleware';
import { clearCsrfTokenOnSuccess } from './configuration/middlewares/clear-csrf-token-on-success.middleware';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);


  setupCookieParser(app);
  setupCsurfApp(app);
  setupVersioning(app);
  setupRateLimit(app);
  setupHelmet(app);
  setupCompression(app);
  setupCors(app);
  setupGlobalGuards(app);
  setupGlobalPrefix(app);
  setupGlobalValidation(app);
  setupResponseInterceptor(app);
  setupExceptionFilter(app);
  setupSwagger(app);
  setupUserAgentMiddleware(app);


  await app.listen(environment.serverPort);

  logger.log(`Gateway corriendo en el puerto ${environment.serverPort}`);

  // 🔹 Manejar cierre correcto
  process.on('SIGINT', async () => {
    console.log("🛑 Apagando el microservicio...");
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log("🛑 Apagando por SIGTERM...");
    await app.close();
    process.exit(0);
  });
}
bootstrap();

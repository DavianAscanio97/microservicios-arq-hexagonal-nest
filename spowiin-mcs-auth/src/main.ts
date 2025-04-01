import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { environment } from './common/env';
import { setupExceptionFilter } from './common/middlewares/exception-filter.middleware';

async function bootstrap() {
  const logger = new Logger('authMSC');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['log', 'warn', 'error'],
      transport: Transport.TCP,
      options: {
        port: environment.serverPort,
      },
    },
  );
  setupExceptionFilter(app);

  await app.listen();
  logger.log(`Microservice running on port ${environment.serverPort}`);

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
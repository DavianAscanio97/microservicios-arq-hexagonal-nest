import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/users.module';
@Module({
  imports: [UsersModule], // ✅ Ahora CoreModule está disponible globalmente
  controllers: [],
  providers: [],
})
export class AppModule { }

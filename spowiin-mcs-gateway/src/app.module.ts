import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProtectionModule } from './modules/protection/protection.module';

@Module({
  imports: [UsersModule, AuthModule, ProtectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

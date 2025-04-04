import { Module } from '@nestjs/common';
import { CredentialModule } from './contexts/auth/credential.module';

@Module({
  imports: [CredentialModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

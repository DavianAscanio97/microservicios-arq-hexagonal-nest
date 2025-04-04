import { CreateCredentialDto } from "../dtos/create-credential.dto";
import { LoginDto } from "../dtos/login.dto";
export const CREDENTIAL_SERVICE = "CredentialService";
export interface CredentialsService {
    login(loginDto: LoginDto): Promise<any>;
    createCredential(createCredentialDto: CreateCredentialDto): Promise<any>;
    logout(userId: string): Promise<any>;
}


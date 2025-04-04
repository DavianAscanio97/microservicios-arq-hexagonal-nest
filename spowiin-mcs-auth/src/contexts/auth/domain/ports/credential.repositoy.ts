import { Credential } from "../entities/credential.entity";

export const CREDENTIAL_REPOSITORY = "CredentialRepository";

export interface CredentialRepository {
    login(): Promise<void>;
    publishEvents(auth: Credential): Promise<void>;
    create(credential: Credential): Promise<void>;
}

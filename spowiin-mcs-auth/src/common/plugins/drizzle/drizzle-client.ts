import { drizzle } from 'drizzle-orm/node-postgres';
import { environment } from 'src/common/env';
export const db = drizzle(environment.databaseUrl!);

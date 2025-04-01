import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { environment } from 'src/common/env';
export default defineConfig({
    out: "./src/common/plugins/drizzle/sql/backup",
    schema: "./src/common/plugins/drizzle/schemas",
    dialect: 'postgresql',
    dbCredentials: {
        url: environment.databaseUrl!,
    },
    migrations: {
        schema: 'public',
    }
});

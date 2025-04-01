import * as fs from 'fs';
import * as path from 'path';

// Capturar argumentos del comando
const args = process.argv.slice(2);

// Buscar el nombre de la migración (el primer argumento que no empieza con `--`)
const migrationName = args.find(arg => !arg.startsWith('--')) || '';

// Buscar el tipo de migración basado en `--type=table`, `--type=relation` o `--type=alter`
const type = args.find(arg => arg === 'table' || arg === 'relation' || arg === 'alter') || 'table';
const validTypes = ['table', 'relation', 'alter'];

if (!migrationName) {
  console.error('❌ Debes proporcionar un nombre para la migración. Ejemplo:');
  console.error('   npm run db:migrate create_table_users --type=table');
  console.error('   npm run db:migrate add_foreign_key_posts --type=relation');
  console.error('   npm run db:migrate alter_table_users --type=alter');
  process.exit(1);
}

if (!validTypes.includes(type)) {
  console.error('❌ Tipo de migración no reconocido. Usa: --type=table, --type=relation o --type=alter');
  process.exit(1);
}

// Generar timestamp en formato YYYYMMDDHHMMSS
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

// Formatear el nombre para usarlo como variable en TypeScript
const formattedMigrationName = migrationName.replace(/[^a-zA-Z0-9_]/g, '_'); // Reemplaza caracteres no válidos
const tableName = formattedMigrationName.toLowerCase(); // Nombre de la tabla en minúsculas

// Nombre del archivo de migración
const fileName = `${timestamp}_${migrationName}.ts`;

// Definir la carpeta de migraciones dentro de `drizzle/migrations/`
const migrationsDir = path.join(__dirname, '../drizzle/migrations');

// Verificar si la carpeta `drizzle/migrations/` existe, si no, crearla
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Definir la plantilla según el tipo de migración en Drizzle ORM
let migrationTemplate = '';

switch (type) {
  case 'table':
    migrationTemplate = `import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const ${formattedMigrationName} = pgTable('${tableName}', {
    id: text('id').primaryKey().default(sql\`uuid_generate_v4()\`).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
`;
    break;

  case 'relation':
    migrationTemplate = `import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
    id: text('id').primaryKey().default(sql\`uuid_generate_v4()\`).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
});

export const ${formattedMigrationName} = pgTable('${tableName}', {
    id: text('id').primaryKey().default(sql\`uuid_generate_v4()\`).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const ${formattedMigrationName}Relations = relations(${formattedMigrationName}, ({ one }) => ({
    user: one(users, {
        fields: [${formattedMigrationName}.userId],
        references: [users.id],
    }),
}));
`;
    break;

  case 'alter':
    migrationTemplate = `import { sql } from 'drizzle-orm';

export const alter_${formattedMigrationName} = sql\`
  ALTER TABLE ${tableName} ADD COLUMN email TEXT UNIQUE NOT NULL;
\`;
`;
    break;

  default:
    console.error('❌ Tipo de migración no reconocido. Usa: --type=table, --type=relation o --type=alter');
    process.exit(1);
}

// Ruta completa del archivo
const filePath = path.join(migrationsDir, fileName);

// Verificar si el archivo ya existe antes de crearlo
if (fs.existsSync(filePath)) {
  console.error(`❌ La migración '${fileName}' ya existe.`);
  process.exit(1);
}

// Crear el archivo de migración con la plantilla base
fs.writeFileSync(filePath, migrationTemplate);

console.log(`✅ Migración creada con éxito: drizzle/migrations/${fileName}`);

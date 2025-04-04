import { pgTable, text, varchar, timestamp, boolean, integer, PgTable, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const users = pgTable('users', {
    // Identificación
    id: text('id').primaryKey().default(sql`uuid_generate_v4()`).notNull(),

    // Información del usuario
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    phoneNumber: varchar('phone_number', { length: 20 }).unique().default(null),
    avatarUrl: varchar('avatar_url', { length: 512 }).default(null),
    dateOfBirth: date('date_of_birth').default(null),
    gender: varchar('gender', { length: 10 }).default(null), // "male", "female", "other"

    // Fechas de creación y actualización
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').default(null),
});

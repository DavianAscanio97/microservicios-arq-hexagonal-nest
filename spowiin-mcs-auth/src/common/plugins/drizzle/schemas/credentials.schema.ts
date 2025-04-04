import { pgTable, text, varchar, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const credentials = pgTable('credentials', {
    // Identificación
    id: text('id').primaryKey().default(sql`uuid_generate_v4()`).notNull(),

    userId: text('user_id').notNull().unique(), // ID del usuario en el sistema
    firstName: text('first_name').notNull(), // Nombre del usuario
    lastName: text('last_name').notNull(), // Apellido del usuario
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    // Seguridad y autenticación
    password: text('password').notNull(),
    email: text('email').notNull().unique(), // Correo electrónico del usuario
    authProvider: varchar('auth_provider', { length: 50 }).default('email'), // "google", "facebook", "github", "email"
    role: varchar('role', { length: 50 }).default('user'), // "admin", "user", "editor"
    emailVerifiedAt: timestamp('email_verified_at').default(null),
    phoneVerifiedAt: timestamp('phone_verified_at').default(null),
    failedLoginAttempts: integer('failed_login_attempts').default(0), // Intentos fallidos de login en esta sesión
    lockedUntil: timestamp('locked_until').default(null), // Si la cuenta se bloqueó, hasta cuándo
    lastActivityAt: timestamp('last_activity_at').defaultNow(), // Última vez que el usuario realizó una acción

    // Estado del usuario
    isActive: boolean('is_active').default(true),
    isBlocked: boolean('is_blocked').default(false),
    isVerified: boolean('is_verified').default(false),
    isSubscribed: boolean('is_subscribed').default(false),

    // Fechas de creación y actualización
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at').default(null),
});

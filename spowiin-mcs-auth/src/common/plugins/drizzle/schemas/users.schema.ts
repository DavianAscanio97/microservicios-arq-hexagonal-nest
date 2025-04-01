import { pgTable, text, varchar, timestamp, boolean, integer, PgTable, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const users = pgTable('users', {
    // Identificación
    id: text('id').primaryKey().default(sql`uuid_generate_v4()`).notNull(),

    // Información del usuario
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    phoneNumber: varchar('phone_number', { length: 20 }).unique().default(null),
    avatarUrl: varchar('avatar_url', { length: 512 }).default(null),
    dateOfBirth: date('date_of_birth').default(null),
    gender: varchar('gender', { length: 10 }).default(null), // "male", "female", "other"

    // Seguridad y autenticación
    passwordHash: text('password_hash').notNull(),
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

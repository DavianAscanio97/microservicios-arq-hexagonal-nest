ALTER TABLE "credentials" RENAME COLUMN "password_hash" TO "password";--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_email_unique" UNIQUE("email");
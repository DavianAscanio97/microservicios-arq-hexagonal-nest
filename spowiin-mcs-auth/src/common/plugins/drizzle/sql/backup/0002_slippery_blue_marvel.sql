ALTER TABLE "credentials" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_slug_unique" UNIQUE("slug");
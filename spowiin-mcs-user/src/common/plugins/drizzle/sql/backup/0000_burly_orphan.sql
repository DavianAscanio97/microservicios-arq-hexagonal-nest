CREATE TABLE "users" (
	"id" text PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"phone_number" varchar(20) DEFAULT null,
	"avatar_url" varchar(512) DEFAULT null,
	"date_of_birth" date DEFAULT null,
	"gender" varchar(10) DEFAULT null,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp DEFAULT null,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_slug_unique" UNIQUE("slug"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);

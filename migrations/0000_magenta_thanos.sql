CREATE TABLE IF NOT EXISTS "codebin"."sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "codebin"."snippets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "codebin"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"email_confirmed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions__user_id_index" ON "codebin"."sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "snippets__author_id_index" ON "codebin"."snippets" ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "snippets__id_index" ON "codebin"."snippets" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users__email_index" ON "codebin"."users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users__id_index" ON "codebin"."users" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "codebin"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "codebin"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "codebin"."snippets" ADD CONSTRAINT "snippets_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "codebin"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"plaid_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "update" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
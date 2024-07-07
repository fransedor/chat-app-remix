CREATE TYPE "roles" AS ENUM (
  'admin',
  'public'
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar,
	"password" varchar,
  "created_at" timestamp
	"role" roles
);

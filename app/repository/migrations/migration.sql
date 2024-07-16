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

CREATE TABLE "message" {
	"id" serial PRIMARY KEY,
	"user_id" int,
	"room_id" int,
	"text" varchar,
	"media_url" varchar,
	"created_at" timestamp,
}

CREATE TABLE "room" {
	"id" serial PRIMARY KEY,
	"name" varchar,
}

CREATE tABLE "room_users" {
	"user_id" int,
	"room_id" int
}
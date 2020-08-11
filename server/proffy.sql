CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar" text,
  "whatsapp" text,
  "bio" text
);

CREATE TABLE "connections" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "classes" (
  "id" SERIAL PRIMARY KEY,
  "subject" text,
  "cost" int,
  "user_id" int
);

CREATE TABLE "class_schedule" (
  "id" SERIAL PRIMARY KEY,
  "week_day" int,
  "from" int,
  "to" int,
  "class_id" int
);

ALTER TABLE "connections" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "classes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "class_schedule" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("id");

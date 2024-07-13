-- Add PostGIS extension
CREATE EXTENSION postgis;
-- Properties table
CREATE TABLE "public"."properties" (
  "id" uuid not null,
  "name" TEXT NOT NULL,
  "description" TEXT,

  -- Address Sections
  "full_address" TEXT,
  "address_line1" TEXT NOT NULL,
  "address_line2" TEXT,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "zip" TEXT NOT NULL,
  "country" TEXT,
  "coordinate" GEOMETRY(Point, 4326),

  -- References
  "owner_id" uuid not null
);

CREATE UNIQUE INDEX properties_pkey ON "public"."properties" USING btree (id);

CREATE UNIQUE INDEX owner_id ON "public"."properties" USING btree (owner_id);

alter table "public"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "public"."properties" add constraint "properties_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."properties" validate constraint "properties_owner_id_fkey";
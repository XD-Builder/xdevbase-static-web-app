-- Create  a properties table to store the properties information.
-- Only the owner is allowed to update. Users can only insert two properties a day.

-- Add PostGIS extension
-- CREATE EXTENSION postgis;

-- Properties table
CREATE TABLE "public"."properties" (
  "id" uuid DEFAULT gen_random_uuid(),
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
  "latitude" NUMERIC(10, 8),
  "longitude" NUMERIC(11, 8),
  -- "coordinate" GEOMETRY(Point, 4326),

  -- Signed Image URLs
  "image_urls" TEXT[],

  -- References
  "owner_id" uuid not null
);

-- Indexes
CREATE UNIQUE INDEX properties_pkey ON "public"."properties" USING btree (id);

alter table "public"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "public"."properties" add constraint "properties_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."properties" validate constraint "properties_owner_id_fkey";

-- Permissions
alter table "public"."properties" enable row level security;

create policy "Public properties are viewable by everyone."
on "public"."properties"
as permissive
for select
to public
using (true);

CREATE OR REPLACE FUNCTION check_daily_property_creation_limit()
RETURNS BOOLEAN AS $$
DECLARE
    property_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO property_count
    FROM "public"."properties"
    WHERE "owner_id" = auth.uid()
    AND "created_at" >= (NOW() - INTERVAL '1 day');

    RETURN property_count < 2;
END;
$$ LANGUAGE plpgsql;

create policy "Users can insert their own properties."
on "public"."properties"
as permissive
for insert
to public
with check ((auth.uid() = id) AND check_daily_property_creation_limit());

create policy "Users can update own properties."
on "public"."properties"
as permissive
for update
to public
using ((auth.uid() = id));
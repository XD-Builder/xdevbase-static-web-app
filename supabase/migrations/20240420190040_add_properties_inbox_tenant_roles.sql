-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  full_address TEXT,

  -- Address Sections
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,

  -- References
  owner_id INTEGER NOT NULL REFERENCES users(id),
);

-- Chats table
CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  chat_room_id INTEGER NOT NULL REFERENCES chatrooms(id) -- added column for chat room ID
);

-- Inboxes table (renamed to Chatrooms)
CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id),
  user_id INTEGER NOT NULL REFERENCES users(id)
);

-- Roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id INTEGER NOT NULL REFERENCES users(id)
);

-- Relationships between tables
ALTER TABLE properties
  ADD CONSTRAINT fk_properties_owner FOREIGN KEY (owner_id) REFERENCES users(id);

ALTER TABLE chats
  ADD CONSTRAINT fk_chats_property FOREIGN KEY (property_id) REFERENCES properties(id);

ALTER TABLE chatrooms
  ADD CONSTRAINT fk_chatrooms_property FOREIGN KEY (property_id) REFERENCES properties(id);

ALTER TABLE roles
  ADD CONSTRAINT fk_roles_owner FOREIGN KEY (owner_id) REFERENCES users(id);

-- Enum for role types
CREATE TYPE role_type AS ENUM('landlord', 'tenant', 'manager', 'vendor', 'guest', 'visitor');

-- Insert roles with corresponding type
INSERT INTO roles (name, description, owner_id) VALUES
  ('Landlord', 'Responsible for managing the property', 1),
  ('Tenant', 'Renting the property', 2),
  ('Manager', 'Managing the property on behalf of the landlord', 3),
  ('Vendor', 'Providing services or products to the property', 4),
  ('Guest', 'Temporarily visiting the property', 5),
  ('Visitor', 'Briefly visiting the property', 6);
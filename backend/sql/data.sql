--Insert roles
INSERT INTO roles (name) VALUES
                             ('OWNER'),
                             ('ADMIN'),
                             ('TENANT');

-- Insert users
-- Admin
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('John', 'Doe', 'admin@example.com', '$2a$12$bYhoMw35Mor7nxh/aXpGNuN3FbjcxxfCvoGFMMVinl5YLp/cbVW/W', 'admin_contact@example.com', '1234567890');

-- Owners
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Alice', 'Smith', 'owner1@example.com', '$2a$12$IwUG0GkrXb/hkg7yd4T.HOJaDUd0jsIMj/oSBO382PGMvjbSNcdh2', 'alice_contact@example.com', '9876543210');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Bob', 'Johnson', 'owner2@example.com', '$2a$12$IwUG0GkrXb/hkg7yd4T.HOJaDUd0jsIMj/oSBO382PGMvjbSNcdh2', 'bob_contact@example.com', '8765432109');

-- Tenants
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Emma', 'Williams', 'tenant1@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'emma_contact@example.com', '3456789012');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Daniel', 'Brown', 'tenant2@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'daniel_contact@example.com', '2345678901');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Grace', 'Miller', 'tenant3@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'grace_contact@example.com', '5678901234');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Henry', 'Davis', 'tenant4@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'henry_contact@example.com', '4567890123');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Sophia', 'Wilson', 'tenant5@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'sophia_contact@example.com', '3456789012');
INSERT INTO users (name, surname, email, password, contact_email, phone_number) VALUES
    ('Oliver', 'Jones', 'tenant6@example.com', '$2a$12$vd/mxcloKTeL7ASEyOsmueoq.9dm0FJgfCmGYX1NqsFeWxvuvSOLC', 'oliver_contact@example.com', '2345678901');

-- Insert users_roles relationships
-- Admin
INSERT INTO users_roles (user_id, role_id) VALUES
    (1, 2); -- Admin

-- Owners
INSERT INTO users_roles (user_id, role_id) VALUES
    (2, 1); -- Owner
INSERT INTO users_roles (user_id, role_id) VALUES
    (3, 1); -- Owner

-- Tenants
INSERT INTO users_roles (user_id, role_id) VALUES
    (4, 3); -- Tenant
INSERT INTO users_roles (user_id, role_id) VALUES
    (5, 3); -- Tenant
INSERT INTO users_roles (user_id, role_id) VALUES
    (6, 3); -- Tenant
INSERT INTO users_roles (user_id, role_id) VALUES
    (7, 3); -- Tenant
INSERT INTO users_roles (user_id, role_id) VALUES
    (8, 3); -- Tenant
INSERT INTO users_roles (user_id, role_id) VALUES
    (9, 3); -- Tenant
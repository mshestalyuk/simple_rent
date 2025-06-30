CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS
    users,
    apartment,
    roles,
    users_roles,
    rent_contract,
    contract,
    rent_property_photo,
    tenant,
    appeal,
    announcement;


-- Create user table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) DEFAULT NULL,
                       surname VARCHAR(255) DEFAULT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       contact_email VARCHAR(255) DEFAULT NULL,
                       phone_number VARCHAR(255) DEFAULT NULL
);

-- Create roles table
CREATE TABLE roles (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL
);

CREATE TABLE users_roles(
                        user_id bigint not null,
                        role_id int not null,
                        primary key (user_id, role_id),
                        foreign key (user_id) references users(id),
                        foreign key (role_id) references roles(id)

);

-- Create apartment table
CREATE TABLE apartment (
                           id SERIAL PRIMARY KEY,
                           owner_id INTEGER REFERENCES users(id),
                           address VARCHAR NOT NULL,
                           note TEXT DEFAULT NULL
);


-- Create rent_contract table
CREATE TABLE rent_contract (
                               id SERIAL PRIMARY KEY,
                               apartment_id INTEGER REFERENCES apartment(id),
                               resident_user INTEGER REFERENCES users(id) UNIQUE,
                               conclusion_date DATE,
                               expires_date DATE,
                               month_payment DECIMAL,
                               note TEXT
);

-- Create contract table
CREATE TABLE contract (
                          uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          file_name VARCHAR(255),
                          file_type VARCHAR(20),
                          data BYTEA DEFAULT NULL,
                          contract_id INTEGER REFERENCES rent_contract(id)
);

-- Create rent_property_photo table
CREATE TABLE rent_property_photo (
                                     uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                     file_name VARCHAR(255),
                                     file_type VARCHAR(20),
                                     data BYTEA DEFAULT NULL,
                                     contract_id INTEGER REFERENCES rent_contract(id)
);

-- Create tenant table
CREATE TABLE tenant (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        surname VARCHAR(255),
                        email VARCHAR(255),
                        phone_number VARCHAR(30),
                        contract_id INTEGER REFERENCES rent_contract(id)
);

-- Create appeal table
CREATE TABLE appeal (
                        id SERIAL PRIMARY KEY,
                        contract_id INTEGER REFERENCES rent_contract(id),
                        appeal_text VARCHAR(255),
                        emergency_level VARCHAR(30),
                        answer TEXT
);

-- Create announcement table
CREATE TABLE announcement (
                              id SERIAL PRIMARY KEY,
                              apartment_id INTEGER REFERENCES apartment(id),
                              announcement_text INTEGER,
                              levemergency_levelel INTEGER
);
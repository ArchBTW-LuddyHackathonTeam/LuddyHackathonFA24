CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    location_street_address VARCHAR(150) NOT NULL,
    location_secondary_address VARCHAR(100),
    location_city VARCHAR(100) NOT NULL,
    location_region VARCHAR(100) NOT NULL,
    location_zip_code VARCHAR(20),
    location_country VARCHAR(100) NOT NULL
);

CREATE TABLE person (
    person_id SERIAL PRIMARY KEY,
    person_first_name VARCHAR(50) NOT NULL,
    person_last_name VARCHAR(50) NOT NULL,
    person_email VARCHAR(254) NOT NULL,
    person_username VARCHAR(32) NOT NULL,
    location_id INTEGER REFERENCES location (location_id),
    person_title VARCHAR(50),
    person_password_hash VARCHAR(32) NOT NULL,
    CONSTRAINT valid_email CHECK (person_email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    UNIQUE (person_email),
    UNIQUE (person_username)
);

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_description TEXT,
    contact_person_id INTEGER NOT NULL REFERENCES person (person_id)
);

CREATE TABLE repository (
    repository_id SERIAL PRIMARY KEY,
    repository_name VARCHAR(50) NOT NULL,
    repository_description TEXT,
    contact_person_id INTEGER NOT NULL REFERENCES person (person_id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    image VARCHAR(200),
    confirmation_code VARCHAR(300) NOT NULL,
    dinner BOOLEAN,
    party BOOLEAN,
    declined BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE api_miniblog;
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL,

    bio TEXT,

    createAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (

    id SERIAL PRIMARY KEY,

    author_id INTEGER REFERENCES authors(id),

    title VARCHAR(255),

    content TEXT,

    published_at TIMESTAMPTZ DEFAULT NOW()

);
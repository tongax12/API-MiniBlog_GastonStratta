/*CREATE DATABASE api_miniblog;*/
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL,

    bio TEXT,

    create_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (

    id SERIAL PRIMARY KEY,

    author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,

    title VARCHAR(255),

    content TEXT,

    published BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()

);
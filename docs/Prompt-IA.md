## Prompt mandado a la IA para guiarme en la creacion del errorHandler.js:

Eres desarrollador/a backend junior en DevSpark, una pequeña startup que está construyendo la versión inicial de su servicio de contenidos llamado MiniBlog. El equipo de producto necesita una API estable y simple para gestionar usuarios y publicaciones que servirá como base para futuras funcionalidades (frontend, recomendaciones, autenticación). 
Tu tarea es entregar una API REST en Node.js/Express conectada a PostgreSQL que permita crear, leer, actualizar y borrar usuarios y posts, con validaciones, tests básicos y documentación mínima para que el resto del equipo (frontend, DevOps) pueda integrarla y desplegarla en producción.
Situación real y objetivos claros:

Problema: El frontend ya tiene prototipos visuales pero no hay backend funcional. El equipo de producto quiere una API fiable y documentada para seguir con la integración.
Tu misión: Implementar los endpoints CRUD para users y posts, asegurar que los datos se persisten en PostgreSQL, manejar errores y validaciones básicas, escribir tests unitarios que cubran casos críticos y entregar documentación OpenAPI y scripts de creación/seed de la base.
Restricciones: Mantener la arquitectura simple, usar consultas SQL directas (pg), exponer respuestas HTTP apropiadas y no introducir dependencias innecesarias. Preparar la aplicación para deployment en Railway siguiendo buenas prácticas básicas (variables de entorno, no subir credenciales a Github).

Validaciones y Manejo de Errores: Implementa validaciones de campos obligatorios, control de unicidad de email y middleware global de manejo de errores con respuestas HTTP apropiadas.Validaciones completas y consistentes. Manejo centralizado de errores con correcta semántica HTTP (400, 404, 500).

Necesito que me ayudes a orientar como hacer el codigo de errorHandler.js, y que me expliques el paso a paso y las decisiones o la lógica que usaste:

## Respuesta de la IA:
Vamos paso a paso con el errorHandler.js. Te explico la lógica y las decisiones de diseño.
¿Qué hace un middleware de errores en Express?
Express tiene un mecanismo especial: si defines un middleware con 4 parámetros (err, req, res, next), lo reconoce automáticamente como manejador de errores. Cuando cualquier parte de tu app llama next(error), Express salta directamente a este middleware.
Además de eso me hizo este diagrama para orientarme [Diagrama que usé como orientación](diagramaError.png).

## Prompt mandado a la IA para orientarme en la creación del endpoint:  GET /posts/author/:authorId

te voy a pasar la seed de la base de datos y read que  me piden para que me orientes como hacerlo, recuerda que ando usando Javascript para codear y el servidor lo ando haciendo con express, node.js y la base de datos con PostgresSQL.
seed: 
CREATE TABLE authors (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
 bio TEXT,
 created_at TIMESTAMPTZ DEFAULT NOW()
); CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 content TEXT NOT NULL,
 author_id INTEGER NOT NULL,
 published BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMPTZ DEFAULT NOW(),
 FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

GET /posts/author/:authorId - posts con detalle de su author


## Respuesta de la IA: 

Lo que te piden es un JOIN entre posts y authors. Te oriento así:
SELECT 
  posts.id,
  posts.title,
  posts.content,
  posts.published,
  posts.created_at,
  authors.id AS author_id,
  authors.name AS author_name,
  authors.email AS author_email,
  authors.bio AS author_bio
FROM posts
JOIN authors ON posts.author_id = authors.id
WHERE posts.author_id = $1;


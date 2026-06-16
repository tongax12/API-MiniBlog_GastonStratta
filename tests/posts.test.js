import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../server.js');

let createdAuthorId;
let createdPostId;

beforeAll(async () => {
  const res = await request(app)
    .post('/authors')
    .send({
      name: 'Autor Temporal Posts',
      email: `posts_test_${Date.now()}@mail.com`,
      bio: 'Autor creado para tests de posts',
    });

  createdAuthorId = res.body.id;
});

describe('POSTS', () => {

  it('GET /posts → 200 y devuelve un array', async () => {
    const res = await request(app).get('/posts');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /posts → 201 y devuelve el post creado', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post de prueba',
        content: 'Contenido de prueba',
        author_id: createdAuthorId,
        published: false,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Post de prueba');

    createdPostId = res.body.id;
  });

  it('POST /posts → 400 si author_id no existe', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post huérfano',
        content: 'Sin autor válido',
        author_id: 999999,
        published: false,
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /posts → 400 si falta title o content', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ author_id: createdAuthorId });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /posts/author/:id → 200 y devuelve posts del autor', async () => {
    const res = await request(app).get(`/posts/author/${createdAuthorId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('GET /posts/author/:id → 400 si author_id no existe', async () => {
    const res = await request(app).get('/posts/author/999999');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('DELETE /posts/:id → 200 y devuelve el post eliminado', async () => {
    const res = await request(app).delete(`/posts/${createdPostId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdPostId);
  });

});

afterAll(async () => {
  if (createdAuthorId) {
    await request(app).delete(`/authors/${createdAuthorId}`);
  }
});
import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../server.js');

let createdAuthorId;

describe('AUTHORS', () => {

  it('GET /authors → 200 y devuelve un array', async () => {
    const res = await request(app).get('/authors');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /authors → 201 y devuelve el autor creado', async () => {
    const res = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        email: `test_${Date.now()}@mail.com`,
        bio: 'Bio de prueba',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Author');

    createdAuthorId = res.body.id;
  });

  it('POST /authors → 409 si el email ya existe', async () => {
    const email = `dup_${Date.now()}@mail.com`;

    await request(app)
      .post('/authors')
      .send({ name: 'Autor Uno', email, bio: 'bio' });

    const res = await request(app)
      .post('/authors')
      .send({ name: 'Autor Dos', email, bio: 'bio' });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('POST /authors → 400 si falta name o email', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ bio: 'sin nombre ni email' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /authors/:id → 200 y devuelve el autor correcto', async () => {
    const res = await request(app).get(`/authors/${createdAuthorId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdAuthorId);
  });

  it('GET /authors/:id → 404 si el autor no existe', async () => {
    const res = await request(app).get('/authors/999999');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('PUT /authors/:id → 200 y devuelve el autor actualizado', async () => {
    const res = await request(app)
      .put(`/authors/${createdAuthorId}`)
      .send({
        name: 'Autor Actualizado',
        email: `updated_${Date.now()}@mail.com`,
        bio: 'Bio actualizada',
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Autor Actualizado');
  });

  it('DELETE /authors/:id → 200 y devuelve el autor eliminado', async () => {
    const res = await request(app).delete(`/authors/${createdAuthorId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdAuthorId);
  });

});
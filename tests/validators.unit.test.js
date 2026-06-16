import { describe, it, expect, vi } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  validateName,
  validateTitle,
  validateContent,
  validateAuthorIdFromBody,
  validateAuthorIdFromParams,
  checkEmailOnCreate,
  checkEmailOnUpdate,
} = require('../src/middlewares/validator');

const mockReqRes = (body = {}, params = {}) => ({
  req: { body, params },
  res: {},
  next: vi.fn(),
});

// ─────────────────────────────────────────────
// validateName
// ─────────────────────────────────────────────
describe('validateName', () => {

  it('llama next() si name es válido', () => {
    const { req, res, next } = mockReqRes({ name: 'Ana García' });
    validateName(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('llama next(error 400) si falta name', () => {
    const { req, res, next } = mockReqRes({});
    validateName(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo nombre es obligatorio');
  });

  it('llama next(error 400) si name está vacío', () => {
    const { req, res, next } = mockReqRes({ name: '   ' });
    validateName(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo nombre no puede estar vacio');
  });

  it('llama next(error 400) si name supera 100 caracteres', () => {
    const { req, res, next } = mockReqRes({ name: 'a'.repeat(101) });
    validateName(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El nombre no debe exceder los 100 caracteres');
  });

});

// ─────────────────────────────────────────────
// validateTitle
// ─────────────────────────────────────────────
describe('validateTitle', () => {

  it('llama next() si title es válido', () => {
    const { req, res, next } = mockReqRes({ title: 'Mi post' });
    validateTitle(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('llama next(error 400) si falta title', () => {
    const { req, res, next } = mockReqRes({});
    validateTitle(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo titulo es obligatorio');
  });

  it('llama next(error 400) si title está vacío', () => {
    const { req, res, next } = mockReqRes({ title: '   ' });
    validateTitle(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo titulo no puede estar vacio');
  });

  it('llama next(error 400) si title supera 255 caracteres', () => {
    const { req, res, next } = mockReqRes({ title: 'a'.repeat(256) });
    validateTitle(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El titulo no debe exceder los 255 caracteres');
  });

});

// ─────────────────────────────────────────────
// validateContent
// ─────────────────────────────────────────────
describe('validateContent', () => {

  it('llama next() si content es válido', () => {
    const { req, res, next } = mockReqRes({ content: 'Contenido válido' });
    validateContent(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('llama next(error 400) si falta content', () => {
    const { req, res, next } = mockReqRes({});
    validateContent(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo contenido es obligatorio');
  });

  it('llama next(error 400) si content está vacío', () => {
    const { req, res, next } = mockReqRes({ content: '   ' });
    validateContent(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo contenido no puede estar vacio');
  });

});

// ─────────────────────────────────────────────
// validateAuthorIdFromBody
// ─────────────────────────────────────────────
describe('validateAuthorIdFromBody', () => {

  it('llama next(error 400) si falta author_id', async () => {
    const { req, res, next } = mockReqRes({});
    await validateAuthorIdFromBody(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo author_id es obligatorio');
  });

  it('llama next(error 400) si author_id no es un número', async () => {
    const { req, res, next } = mockReqRes({ author_id: 'abc' });
    await validateAuthorIdFromBody(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo author_id debe ser un número válido');
  });

  it('llama next(error 400) si author_id es menor o igual a 0', async () => {
    const { req, res, next } = mockReqRes({ author_id: -1 });
    await validateAuthorIdFromBody(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo author_id debe ser un número válido');
  });

});

// ─────────────────────────────────────────────
// validateAuthorIdFromParams
// ─────────────────────────────────────────────
describe('validateAuthorIdFromParams', () => {

  it('llama next(error 400) si author_id no es un número', async () => {
    const { req, res, next } = mockReqRes({}, { id: 'abc' });
    await validateAuthorIdFromParams(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo author_id debe ser un número válido');
  });

  it('llama next(error 400) si author_id es menor o igual a 0', async () => {
    const { req, res, next } = mockReqRes({}, { id: '-5' });
    await validateAuthorIdFromParams(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo author_id debe ser un número válido');
  });

});

// ─────────────────────────────────────────────
// checkEmailOnCreate
// ─────────────────────────────────────────────
describe('checkEmailOnCreate', () => {

  it('llama next(error 400) si falta email', async () => {
    const { req, res, next } = mockReqRes({});
    await checkEmailOnCreate(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo email es obligatorio');
  });

  it('llama next(error 400) si el formato del email es inválido', async () => {
    const { req, res, next } = mockReqRes({ email: 'no-es-un-email' });
    await checkEmailOnCreate(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El formato del correo no es válido');
  });

});

// ─────────────────────────────────────────────
// checkEmailOnUpdate
// ─────────────────────────────────────────────
describe('checkEmailOnUpdate', () => {

  it('llama next(error 400) si falta email', async () => {
    const { req, res, next } = mockReqRes({}, { id: '1' });
    await checkEmailOnUpdate(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El campo email es obligatorio');
  });

  it('llama next(error 400) si el formato del email es inválido', async () => {
    const { req, res, next } = mockReqRes({ email: 'formato-malo' }, { id: '1' });
    await checkEmailOnUpdate(req, res, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('El formato del correo no es válido');
  });

});
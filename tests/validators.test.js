import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { validateTitle, validateContent, checkTitleOnCreate, checkContentOnCreate } from '../src/middlewares/validator';
import pool from '../db/config';

describe('Validators Middleware', () => {
    
    describe('validateTitle', () => {
        it('debería rechazar título vacío', () => {
            const req = { body: { title: '' } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateTitle(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        });

        it('debería rechazar título sin valor', () => {
            const req = { body: {} };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateTitle(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('debería rechazar título muy largo (>255)', () => {
            const req = { body: { title: 'a'.repeat(256) } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateTitle(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('debería aceptar título válido', () => {
            const req = { body: { title: 'Título válido' } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateTitle(req, res, next);
            
            expect(next).toHaveBeenCalled();
        });
    });

    describe('validateContent', () => {
        it('debería rechazar contenido vacío', () => {
            const req = { body: { content: '' } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateContent(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('debería aceptar contenido válido', () => {
            const req = { body: { content: 'Contenido válido' } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            const next = vi.fn();

            validateContent(req, res, next);
            
            expect(next).toHaveBeenCalled();
        });
    });
});
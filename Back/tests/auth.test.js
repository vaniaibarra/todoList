const request = require('supertest');
const app = require('../app');
const { pool } = require('../src/db/database');

beforeAll(async () => {
    await pool.query('TRUNCATE tasks, users, priorities RESTART IDENTITY CASCADE');
});

afterAll(async () => {
    await pool.end();
});

describe('Flujo de autenticación', () => {
    const mockUser = {
        name: "Vania Test",
        email: "vania@test.com",
        password: "password123"
    };

    it('Registrar usuario de manera exitosa', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(mockUser);

        expect(response.status).toBe(201);
    });

    it('No permitir registrar un email duplicado', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(mockUser);

        expect(response.status).toBe(400);
    });

    it('Recibir token JWT al loguearse', async () => {
        const response = await request(app)
            .post('/user/login')
            .send(mockUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});


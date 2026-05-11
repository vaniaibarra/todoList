const request = require('supertest');
const app = require('../app');
const { pool } = require('../src/db/database');

describe('CRUD', () => {
    let token;
    let userId;

    beforeAll(async () => {
        await pool.query('TRUNCATE tasks, users, priorities, categories RESTART IDENTITY CASCADE');

        await pool.query("INSERT INTO priorities (name) VALUES ('Urgente'), ('Alta'), ('Media'), ('Baja')");
        await pool.query("INSERT INTO categories (name) VALUES ('Estudio'), ('Trabajo'), ('Hogar'), ('Personal'), ('Entrenamiento'), ('General')")

        const userRes = await request(app)
            .post('/user/register')
            .send({name: 'Vania', email: 'vania@mail.com', password: '123'});

        const loginRes = await request(app)
            .post('/user/login')
            .send({email: 'vania@mail.com', password: '123'});

        token = loginRes.body.token;
    });

    afterAll(async () => {
        await pool.end();
    });

    it('Nueva tarea al tener token válido', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                task_name: 'Estudiar para el exámen',
                priority_id: 1,
                category_id: 2
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.task_name).toBe('Estudiar para el exámen');
    });

    it('Debe fallar con 401 si no se envía el token', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({task_name: 'Tarea nula'});

        expect(response.status).toBe(401);
    });

    it('Obtener lista de tareas con formato de paginación', async () => {
        await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({task_name: "Segunda tarea", priority_id: 2, category_id: 3});

        const response = await request(app)
            .get('/tasks?page=1&limit=10')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0]).toHaveProperty('priority_name');
    });

    it('Editar tarea', async () => {
        const taskId = 1
        const response = await request(app)
            .patch(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority_id: 3,
                category_id: 1
            })
        expect(response.status).toBe(200);
     
        expect(typeof response.body).toBe('object');
        expect(response.body.priority_id).toBe(3);
        expect(response.body).toMatchObject({
            id: taskId,
            priority_id: 3,
            category_id: 1
        });
    });

    it('Eliminar tarea', async () => {
        const taskIdToDelete = 2;
        const response = await request(app)
            .delete(`/tasks/${taskIdToDelete}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
        

        const getResponse = await request(app)
            .get(`/tasks/${taskIdToDelete}`)
            .set('Authorization', `Bearer ${token}`)

        
        expect(getResponse.status).toBe(404);
    });

    it('No debe permitir crear tareas con token inválido', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer token_falso_321`)
            .send({task_name: 'Hack', priority_id: 1})

        expect(response.status).toBe(401);
    });
    
});
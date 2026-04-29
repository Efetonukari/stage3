import { request } from '../../utils/api';
import { faker } from '@faker-js/faker';

describe('Authentication API - Negative Tests', () => {
    describe('POST /auth/register', () => {
        it('Should fail registration with already registered email', async () => {
            const res = await request.post('/auth/register').send({
                email: process.env.TEST_USER_EMAIL,
                password: 'Password123!',
                first_name: 'Test',
                last_name: 'User'
            });
            expect(res.status).toBeGreaterThanOrEqual(400);
        });
    });

    describe('POST /auth/login', () => {
        it('Should reject login with invalid password', async () => {
            const res = await request.post('/auth/login').send({
                email: process.env.TEST_USER_EMAIL,
                password: 'WrongPassword!!!'
            });
            expect(res.status).toBe(400);
        });

        it('Should reject login with unregistered email', async () => {
            const res = await request.post('/auth/login').send({
                email: faker.internet.email(),
                password: 'Password123!'
            });
            expect([400, 401, 404]).toContain(res.status);
        });
    });
});

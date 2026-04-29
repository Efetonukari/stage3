import { request } from '../../utils/api';
import { faker } from '@faker-js/faker';

describe('Authentication API - Edge Cases & Boundary Tests', () => {
    describe('POST /auth/register', () => {
        it('Should handle extremely long password during registration', async () => {
            const res = await request.post('/auth/register').send({
                email: faker.internet.email(),
                password: 'A'.repeat(1000),
                first_name: 'Test',
                last_name: 'User'
            });
            expect(res.status).toBeGreaterThanOrEqual(400);
        });
    });

    describe('POST /auth/login', () => {
        it('Should reject login with missing password field', async () => {
            const res = await request.post('/auth/login').send({ 
                email: process.env.TEST_USER_EMAIL 
            });
            expect(res.status).toBe(400);
            expect(typeof res.body.message).toBe('string');
        });

        it('Should reject login with empty payload {}', async () => {
            const res = await request.post('/auth/login').send({});
            expect(res.status).toBe(400);
        });

        it('Should reject login with invalid email format', async () => {
            const res = await request.post('/auth/login').send({
                email: 'invalid-email-format',
                password: 'Password123!'
            });
            expect(res.status).toBe(400);
        });

        it('Should handle SQL injection attempt in email gracefully', async () => {
            const res = await request.post('/auth/login').send({
                email: "' OR 1=1 --",
                password: 'Password123!'
            });
            expect([400, 401]).toContain(res.status);
        });
    });
});

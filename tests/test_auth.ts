import { request } from '../utils/api';
import { userLoginSchema } from '../utils/schema';
import { faker } from '@faker-js/faker';

describe('Authentication API', () => {
    const dynamicEmail = faker.internet.email();
    const dynamicPassword = 'ValidPassword123!';

    // ===================== POSITIVE TESTS =====================
    describe('POST /auth/register - Positive Tests', () => {
        it('Should register a new user dynamically', async () => {
            const res = await request.post('/auth/register').send({
                email: dynamicEmail,
                password: dynamicPassword,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName()
            });
            expect([200, 201]).toContain(res.status);
        });
    });

    describe('POST /auth/login - Positive Tests', () => {
        it('Should login with valid credentials & validate schema', async () => {
            const res = await request.post('/auth/login').send({
                email: process.env.TEST_USER_EMAIL,
                password: process.env.TEST_USER_PASSWORD
            });
            expect(res.status).toBe(200);
            const { error } = userLoginSchema.validate(res.body);
            expect(error).toBeUndefined();
        });
    });

    // ===================== NEGATIVE TESTS =====================
    describe('POST /auth/register - Negative Tests', () => {
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

    describe('POST /auth/login - Negative Tests', () => {
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

    // ===================== EDGE CASES & BOUNDARY TESTS =====================
    describe('POST /auth/register - Edge Cases', () => {
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

    describe('POST /auth/login - Edge Cases', () => {
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

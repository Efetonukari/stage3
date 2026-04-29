import { request } from '../../utils/api';
import { userLoginSchema } from '../../utils/schema';
import { faker } from '@faker-js/faker';

describe('Authentication API - Positive Tests', () => {
    const dynamicEmail = faker.internet.email();
    const dynamicPassword = 'ValidPassword123!';

    describe('POST /auth/register', () => {
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

    describe('POST /auth/login', () => {
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
});

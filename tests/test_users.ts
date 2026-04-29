import { request } from '../utils/api';
import { getAuthToken } from '../utils/auth';
import { faker } from '@faker-js/faker';

describe('Protected User Routes', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    // ===================== POSITIVE TESTS =====================
    describe('User Routes - Positive Tests', () => {
        it('Should fetch user profile with valid Bearer token', async () => {
            const res = await request.get('/users/me').set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });

        it('Should fetch all users list using valid token', async () => {
            const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
            expect([200, 403]).toContain(res.status); 
        });
    });

    // ===================== NEGATIVE TESTS =====================
    describe('User Routes - Negative Tests', () => {
        it('Should reject profile access with NO token provided', async () => {
            const res = await request.get('/users/me');
            expect(res.status).toBe(401);
        });

        it('Should reject profile access with malformed token', async () => {
            const res = await request.get('/users/me').set('Authorization', `Bearer invalid_garbage_string_123`);
            expect(res.status).toBe(401);
        });

        it('Should reject profile access with expired token', async () => {
            const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyleHAiOjE1MTYyMzkwMjJ9.X";
            const res = await request.get('/users/me').set('Authorization', `Bearer ${expiredToken}`);
            expect(res.status).toBe(401);
        });

        it('Should reject access with missing "Bearer" prefix', async () => {
            const res = await request.get('/users/me').set('Authorization', token);
            expect(res.status).toBe(401);
        });
    });

    // ===================== EDGE CASES =====================
    describe('User Routes - Edge Cases', () => {
        it('Should handle fetching non-existent user ID', async () => {
            const fakeUUID = faker.string.uuid();
            const res = await request.get(`/users/${fakeUUID}`).set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(400);
        });
    });
});

import { request } from '../utils/api';
import { getAuthToken } from '../utils/auth';

describe('Profile Route', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    // ===================== POSITIVE TESTS =====================
    describe('Profile Route - Positive Tests', () => {
        it('Should fetch user profile with valid Bearer token', async () => {
            const res = await request.get('/users/me').set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });
    });

    // ===================== NEGATIVE TESTS =====================
    describe('Profile Route - Negative Tests', () => {
        it('Should reject fetching user profile with invalid Bearer token', async () => {
            const res = await request.get('/users/me').set('Authorization', `Bearer invalid_garbage_string_123`);
            expect(res.status).toBe(401);
        });

        it('Should reject fetching user profile with no token', async () => {
            const res = await request.get('/users/me');
            expect(res.status).toBe(401);
        });
    });
});

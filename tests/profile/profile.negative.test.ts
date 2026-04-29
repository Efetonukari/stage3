import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';
import { faker } from '@faker-js/faker';

describe('Profile Route - Negative Tests', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('Should reject fetching user profile with invalid Bearer token', async () => {
        const res = await request.get('/users/me').set('Authorization', `Bearer invalid_garbage_string_123`);
        expect(res.status).toBe(401);
    });

    it('Should reject fetching user profile with no token', async () => {
        const res = await request.get('/users/me');
        expect(res.status).toBe(401);
    });
});

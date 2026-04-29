import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';

describe('Protected User Routes - Positive Tests', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

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

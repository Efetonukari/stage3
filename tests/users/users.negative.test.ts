import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';

describe('Protected User Routes - Negative Tests', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

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

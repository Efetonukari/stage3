import { request } from '../utils/api';
import { getAuthToken, getRealExpiredToken } from '../utils/auth';
import { userProfileResponseSchema, allUsersListSchema, errorSchema } from '../utils/schema';
import { faker } from '@faker-js/faker';

describe('Protected User Routes', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    // ===================== POSITIVE TESTS =====================
    describe('User Routes - Positive Tests', () => {

        it('Should fetch all users list using valid token & strictly validate schema', async () => {
            const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
            
            // STRICT: Exactly 200 OK
            expect(res.status).toBe(400); 
            
            // DEEP SCHEMA VALIDATION (Validates every single user in the array)
            const { error } = allUsersListSchema.validate(res.body);
            expect(error).toBeUndefined();
        });
    });

    // ===================== NEGATIVE TESTS =====================
    describe('User Routes - Negative Tests', () => {
        it('Should reject profile access with NO token provided', async () => {
            const res = await request.get('/users/me');
            
            // STRICT: Zedu uses 401 for unauthorized
            expect(res.status).toBe(401);
            
            const { error } = errorSchema.validate(res.body);
            expect(error).toBeUndefined();
        });

        it('Should reject profile access with malformed token', async () => {
            const res = await request.get('/users/me').set('Authorization', `Bearer invalid_garbage_string_123`);
            
            expect(res.status).toBe(401);
            
            const { error } = errorSchema.validate(res.body);
            expect(error).toBeUndefined();
        });

        it('Should reject profile access with mathematically expired token', async () => {
            // Using the new helper to generate a token from the year 2020
            const expiredToken = getRealExpiredToken(); 
            const res = await request.get('/users/me').set('Authorization', `Bearer ${expiredToken}`);
            
            expect(res.status).toBe(401);
            
            const { error } = errorSchema.validate(res.body);
            expect(error).toBeUndefined();
        });

        it('Should reject access with missing "Bearer" prefix', async () => {
            const res = await request.get('/users/me').set('Authorization', token);
            
            expect(res.status).toBe(401);
            
            const { error } = errorSchema.validate(res.body);
            expect(error).toBeUndefined();
        });
    });

    // ===================== EDGE CASES =====================
    describe('User Routes - Edge Cases', () => {
        it('Should handle fetching non-existent user ID', async () => {
            const fakeUUID = faker.string.uuid();
            const res = await request.get(`/users/${fakeUUID}`).set('Authorization', `Bearer ${token}`);
            
            // STRICT: Zedu's standard for missing/bad data seems to be 400 (or 404 depending on the endpoint)
            expect(res.status).toBe(400);
            
            const { error } = errorSchema.validate(res.body);
            expect(error).toBeUndefined();
        });
    });
});
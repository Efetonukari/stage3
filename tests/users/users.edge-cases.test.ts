import { faker } from '@faker-js/faker';
import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';

describe('Protected User Routes - Edge Cases', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('Should handle fetching non-existent user ID', async () => {
        const fakeUUID = faker.string.uuid();
        const res = await request.get(`/users/${fakeUUID}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
    });
});

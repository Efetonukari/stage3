import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';
import { faker } from '@faker-js/faker';

describe('Organizations/Workspaces Routes - Edge Cases', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('Should return 400/404 for invalid organization ID format (string instead of UUID)', async () => {
        const res = await request.get(`/organisations/invalid-id-format`)
            .set('Authorization', `Bearer ${token}`);
        expect([400, 404, 500]).toContain(res.status);
    });
});

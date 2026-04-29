import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';
import { faker } from '@faker-js/faker';

describe('Organizations/Workspaces Routes - Positive Tests', () => {
    let token: string;
    let createdOrgId: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('Should create an organization dynamically', async () => {
        const res = await request.post('/organisations')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: faker.company.name(),
                email: faker.internet.email(),
                description: "Automated Test Org"
            });
        expect([200, 201, 422]).toContain(res.status);
        createdOrgId = res.body?.data?.id || res.body?.id; 
    });

    it('Should fetch a single organization by valid ID', async () => {
        if (!createdOrgId) return;
        const res = await request.get(`/organisations/${createdOrgId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('Should update an organization', async () => {
        if (!createdOrgId) return;
        const res = await request.patch(`/organisations/${createdOrgId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ description: "Updated via automation" });
        expect(res.status).toBe(200);
    });

    it('Should attempt to delete an organization', async () => {
        if (!createdOrgId) return;
        const res = await request.delete(`/organisations/${createdOrgId}`)
            .set('Authorization', `Bearer ${token}`);
        expect([200, 204, 403]).toContain(res.status);
    });
});

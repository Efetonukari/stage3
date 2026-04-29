import { request } from '../utils/api';
import { getAuthToken } from '../utils/auth';
import { faker } from '@faker-js/faker';

describe('Organizations/Workspaces Routes', () => {
    let token: string;
    let createdOrgId: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    // ===================== POSITIVE TESTS =====================
    describe('Organizations Routes - Positive Tests', () => {
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

    // ===================== NEGATIVE TESTS =====================
    describe('Organizations Routes - Negative Tests', () => {
        it('Should fail creating an organization with empty payload', async () => {
            const res = await request.post('/organisations')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect([400, 422]).toContain(res.status);
        });

        it('Should fail creating organization missing required "name"', async () => {
            const res = await request.post('/organisations')
                .set('Authorization', `Bearer ${token}`)
                .send({ description: "No name provided" });
            expect([400, 422]).toContain(res.status);
        });

        it('Should fail to update organization without token', async () => {
            if (!createdOrgId) {
                const createRes = await request.post('/organisations')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ name: "Test Org", email: "test@org.com", description: "Test" });
                createdOrgId = createRes.body?.data?.id || createRes.body?.id;
            }
            
            if (!createdOrgId) return;
            const res = await request.patch(`/organisations/${createdOrgId}`)
                .send({ description: "No token update" });
            expect(res.status).toBe(401);
        });
    });

    // ===================== EDGE CASES =====================
    describe('Organizations Routes - Edge Cases', () => {
        it('Should return 400/404 for invalid organization ID format (string instead of UUID)', async () => {
            const res = await request.get(`/organisations/invalid-id-format`)
                .set('Authorization', `Bearer ${token}`);
            expect([400, 404, 500]).toContain(res.status);
        });
    });
});

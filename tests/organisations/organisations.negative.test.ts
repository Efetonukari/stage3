import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';

describe('Organizations/Workspaces Routes - Negative Tests', () => {
    let token: string;
    let createdOrgId: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

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

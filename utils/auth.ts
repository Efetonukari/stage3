import * as dotenv from 'dotenv';
import { request } from './api';

dotenv.config();

export async function getAuthToken(): Promise<string> {
    const response = await request
        .post('/auth/login')
        .send({
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD
        })
        .set('Content-Type', 'application/json');

    if (response.status === 200 && response.body?.data?.access_token) {
        return response.body.data.access_token;
    }
    
    throw new Error(`Failed to retrieve token. Status: ${response.status}`);
}
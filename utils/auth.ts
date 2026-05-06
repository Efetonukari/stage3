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

// Add this to the bottom of utils/auth.ts
export function getRealExpiredToken(): string {
    // A JWT has 3 parts: Header, Payload, Signature. 
    // We encode a mathematically valid payload with an 'exp' (expiration) from the year 2020.
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ 
        access_uuid: "expired-uuid",
        user_id: "test-user-id",
        exp: 1577836800 // Epoch timestamp for Jan 1, 2020
    })).toString('base64url'); 
    const signature = "valid_looking_signature_string";
    
    return `${header}.${payload}.${signature}`;
}
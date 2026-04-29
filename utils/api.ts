import * as dotenv from 'dotenv';
const supertest = require('supertest');
dotenv.config();

const baseURL = process.env.BASE_URL || 'https://api.zedu.chat/api/v1';
export const request = supertest(baseURL);
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index.ts'; // Your Express app

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


describe('GET /api/user', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/user');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  
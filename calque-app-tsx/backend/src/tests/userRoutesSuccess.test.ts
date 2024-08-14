
import supertest from 'supertest';
import app from '../app'; // Adjust the import path according to your project structure
import mongoose from 'mongoose';

//
import { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
});

afterAll(async () => {
  // Closing the DB connection and stopping the in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});


//Get all users
describe('GET /api/user', () => {
    test('should return all users', async () => {
      //Get response from server
      const response = await supertest(app).get('/api/user').send();
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
      // Test 2: Body = "Content is valid"
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  

//Get one user of id
describe('GET /api/user', () => {
  test('should return all users', async () => {
    //with jest syntax

    return request(app)
  });
});



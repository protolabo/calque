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

describe('App root route "/"', () => {
  test('Server should respond with 200 status code and "Hello World!" message', async () => {
    // Get the response from the server
    const response = await supertest(app).get('/').send();
    
    // Test 1: Status code success
    expect(response.status).toBe(200);
    
    // Test 2: Body = "Hello World!"
    expect(response.text).toBe('Hello World!');
  });
});

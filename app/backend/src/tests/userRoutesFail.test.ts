
import supertest from 'supertest';
import app from '../app'; // Adjust the import path according to your project structure
import mongoose from 'mongoose';
import {connectDB} from '../database'

//
//import { ConnectOptions } from 'mongoose';
//import { MongoMemoryServer } from 'mongodb-memory-server';

//let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  /*Simulates a fake mongoDB server
    mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
  */
  connectDB()
});

afterAll(async () => {
  // Closing the DB connection and stopping the in-memory MongoDB server
  await mongoose.disconnect();
 // await mongoServer.stop();
});



  

  //get one with test user "john_doe"
  describe('GET /api/user/:id', () => {
    test('should return a user with the id "fakeUser"', async () => {
      // Get response
      const response = await supertest(app).get('/api/user/fakeUser').send();
      
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
      
    });
  });


//UPDATE
  describe('PUT /api/user/:id', () => {
    test('should update the user with the id "john_doe"', async () => {

      // Define the updated user data
      const updatedUserData = {
        fullName: 'fakeUser',
      };
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).put('/api/user/fakeUser').send(updatedUserData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
      // Test 2: Error message
      expect(response.body.message).toBe('User not found')

    });
  });
  

  // POST / CREATE
  describe('POST /api/user/:id', () => {
    test('should create the user with the id "john_doe"', async () => {

      // Define the updated user data
      const updatedUserData = {
        username: 'john_doe',
        fullName: 'John Doe',
        email : 'john_doe@gmail.com',
        password:"XDDDDDDDDD123"
      };
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).post('/api/user/').send(updatedUserData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(400);
      // Test 2: Error message
      expect(response.body.message).toBe('Username or email already exists.')
  
    });
  });


//delete
  describe('DELETE /api/user/:id', () => {
    test('should delete the user with the id "fakeUser"', async () => {
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).delete('/api/user/fakeUser').send();
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
      // Test 2: Error message
      expect(response.body.message).toBe('User not found')
    });
  });
  
  
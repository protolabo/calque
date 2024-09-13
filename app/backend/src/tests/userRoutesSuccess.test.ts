
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
  

  //get one with test user "john_doe"
  describe('GET /api/user/:id', () => {
    test('should return a user with the id "john_doe"', async () => {
      // Get response
      const response = await supertest(app).get('/api/user/john_doe').send();
      
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
      
      // Test 2: Body = "Content is valid" and the returned object is a user
      expect(response.body).toBeInstanceOf(Object);
      
      // Test 3: Ensure the user ID matches "john_doe"
      expect(response.body.username).toBe('john_doe');
      
      // Test 4: Check if the user object has expected properties
      expect(response.body).toHaveProperty('email');
      // Add more property checks as needed
    });
  });



  describe('PUT /api/user/:id', () => {
    test('should update the user with the id "john_doe"', async () => {

      // Define the updated user data
      const updatedUserData = {
        fullName: 'John Doe Updated',
      };
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).put('/api/user/john_doe').send(updatedUserData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
  
      // Test 2: Response should be an object (the updated user)
      expect(response.body).toBeInstanceOf(Object);
  
      // Test 3: Ensure the user ID matches "john_doe"
      expect(response.body.username).toBe('john_doe');
  
      // Test 4: Ensure the user data has been updated correctly
      expect(response.body.fullName).toBe(updatedUserData.fullName);
    });
  });
  

  // POST / CREATE
  describe('POST /api/user/:id', () => {
    test('should create the user with the id "john_doe2"', async () => {

      // Define the updated user data
      const updatedUserData = {
        username: 'john_doe2',
        fullName: 'John Doe 2',
        email : 'john_doe2@gmail.com',
        password:"XDDDDDDDDD123"
      };
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).post('/api/user/').send(updatedUserData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(201);
  
      // Test 2: Response should be an object (the updated user)
      expect(response.body).toBeInstanceOf(Object);
  
      // Test 3: Ensure the user ID matches "john_doe"
      expect(response.body.username).toBe('john_doe2');
    });
  });


//delete
  describe('DELETE /api/user/:id', () => {
    test('should delete the user with the id "john_doe2"', async () => {
  
      // Send PUT request to update the user with id "john_doe"
      const response = await supertest(app).delete('/api/user/john_doe2').send();
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
  
      // Test 2: Response should be an object (the updated user)
      expect(response.body.message).toBe('User deleted successfully')

    });
  });
  
  
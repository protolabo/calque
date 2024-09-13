
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


//Get all projects
describe('GET /api/project', () => {
    test('should return all projects', async () => {
      //Get response from server
      const response = await supertest(app).get('/api/project').send();
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
      // Test 2: Body = "Content is valid"
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  

  //get one with test project "test"
  describe('GET /api/project/:id', () => {
    test('should return a project with the id "test"', async () => {
      // Get response
      const response = await supertest(app).get('/api/project/test').send();
      
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
      
      // Test 2: Body = "Content is valid" and the returned object is a project
      expect(response.body).toBeInstanceOf(Object);
      
      // Test 3: Ensure the project ID matches "test"
      expect(response.body.title).toBe('test');
      
      // Test 4: Check if the project object has expected properties
      expect(response.body).toHaveProperty('creator');
      // Add more property checks as needed
    });
  });



  describe('PUT /api/project/:id', () => {
    test('should update the project with the id "test"', async () => {

      // Define the updated project data
      const updatedprojectData = {
        description: 'updated description',
      };
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).put('/api/project/test').send(updatedprojectData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
  
      // Test 2: Response should be an object (the updated project)
      expect(response.body).toBeInstanceOf(Object);
  
      // Test 3: Ensure the project ID matches "test"
      expect(response.body.title).toBe('test');
  
      // Test 4: Ensure the project data has been updated correctly
      expect(response.body.description).toBe(updatedprojectData.description);
    });
  });
  

  // POST / CREATE
  describe('POST /api/project/:id', () => {
    test('should create the project with the id "test2"', async () => {

      // Define the updated project data
      const updatedprojectData = {
        title: 'test2',
        description: "this is the 2nd project instance of the collection",
        content:"<SVG></SVG>"
      };
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).post('/api/project/').send(updatedprojectData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(201);
  
      // Test 2: Response should be an object (the updated project)
      expect(response.body).toBeInstanceOf(Object);
  
      // Test 3: Ensure the project ID matches "test"
      expect(response.body.title).toBe('test2');
    });
  });


//delete
  describe('DELETE /api/project/:id', () => {
    test('should delete the project with the id "test2"', async () => {
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).delete('/api/project/test2').send();
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(200);
  
      // Test 2: Response should be an object (the updated project)
      expect(response.body.message).toBe('Project deleted successfully')

    });
  });
  
  
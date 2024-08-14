
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


  

  //get one with test project "test"
  describe('GET /api/project/:id', () => {
    test('should fail to return a project with the id "fakeProject"', async () => {
      // Get response
      const response = await supertest(app).get('/api/project/fakeProject').send();
      
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
      // Test 2: Response should be an object (the updated project)
      expect(response.body.message).toBe('Project not found')
    });
  });



  describe('PUT /api/project/:id', () => {
    test('should fail to update the project with the id "fakeProject"', async () => {

      // Define the updated project data
      const updatedprojectData = {
        description: 'updated description',
      };
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).put('/api/project/fakeProject').send(updatedprojectData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
      // Test 2: Response should be an object (the updated project)
      expect(response.body.message).toBe('Project not found')
    });
  });
  

  // POST / CREATE
  describe('POST /api/project/:id', () => {
    test('should fail to create the project with the id "test"', async () => {

      // Define the updated project data
      const projectData = {
        title: 'test',
        description: "this is the 2nd project instance of the collection",
        content:"<SVG></SVG>"
      };
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).post('/api/project/').send(projectData);
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(400);
      // Test 2: Response should be an object (the updated project)
      expect(response.body.message).toBe('Project already exists.')

    });
  });


//delete
  describe('DELETE /api/project/:id', () => {
    test('should delete the project with the id "test2"', async () => {
  
      // Send PUT request to update the project with id "test"
      const response = await supertest(app).delete('/api/project/fakeProject').send();
  
      // Test 1: Status code success
      expect(response.statusCode).toBe(404);
  
      // Test 2: Response should be an object (the updated project)
      expect(response.body.message).toBe('Project not found')

    });
  });
  
  
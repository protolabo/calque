import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route';
import projectRoute from './routes/project.route';
import responseLogger from './middleware/res_logger.middleware';
dotenv.config();

const app: Application = express();
const port: string = (process.env.PORT || "3000");

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL as string);

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to the Database.'));

// Middleware
app.use(express.json()); // Parse JSON bodies for API requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies


//Middleware
app.use(responseLogger); //will print the return values in the console
//Routers
app.use('/api/user', userRoute);
app.use('/api/project', projectRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
/* end */




//old code for the culture

/*

// import dependencies via node require 
require('dotenv').config(); //for environment variables like DATABASE_URL

const express = require('express'); //express facitates interaction with the database
const app = express()
const port = 3000

const mongoose = require('mongoose'); //mongoose facilitates interaction with the mongoDB database
mongoose.connect(process.env.DATABASE_URL);
//.then(()=>{console.log("Connected to the database...");})
//.catch(()=>{console.log("Connection failed.");})
//
//via mongoose
const db = mongoose.connection;
db.on('error', (error:any)=>console.error(error)); //on error connecting to the db
db.once('open', ()=>console.log('Connected to the Database.')); //execute once upon success


//import routes
const userRoute = require("./routes/user.route.js");
const projectRoute = require("./routes/project.route.js");

//middleware
app.use(express.json()); //allows json to be sent in a POST request
app.use(express.urlencoded({extended:false})); //for forms? via Insomnia


//routes
app.use("/api/user", userRoute);






app.get('/', (req :any, res:any) => {
  res.send('Hello World!');
})





//  Executed every time the server is opened  
app.listen(port, () => {
  console.log(Listening to port ${port})
})



  app.get('/api/products', async (req:any,res:any)=>{
      try{
        const product = await Product.find({}); //find all products
        res.status(200).json(product);
      }
      catch(e:any){
        console.log(e);
        res.status(500).json({message : e.message});
      }
    
    })


    app.get('/api/products/:id', async (req:any,res:any)=>{
      try{
        const {id} = req.params;
        const product = await Product.findById({id}); //find specific product
        res.status(200).json(product);
      }
      catch(e:any){
        console.log(e);
        res.status(500).json({message : e.message});
      }
    
    })


  app.post('/api/products', async (req:any,res:any)=>{
  //  console.log(req.body);
   // res.send(req.body); 
    try{
      //save the product
      const product = await Product.create(req.body);
      res.status(200).json(product);
    }
    catch(e:any){
      console.log(e);
      res.status(500).json({message : e.message});
    }

  })




  app.put('/api/products/:id', async (req:any,res:any)=>{
    try{
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body); //find specific product
      
      if (!product){
        return res.status(404).json({message : "product not found"}); 
      }
      const updatedProduct = await Product.findById(id); //catched if updatedProduct does not exist
      res.status(200).json(product);
    }
    catch(e:any){
      console.log(e);
      res.status(500).json({message : e.message});
    }

  })


  app.delete('/api/products/:id', async (req:any,res:any)=>{
    try{
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id); //find specific product
      
      if (!product){
        return res.status(404).json({message : "product not found"}); 
      }
      res.status(200).json({message:"product deleted"});
    }
    catch(e:any){
      console.log(e);
      res.status(500).json({message : e.message});
    }

  })






*/
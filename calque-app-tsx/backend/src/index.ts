/*
For my colleagues :

If you need to include the dependencies or build artifacts, the process is detailed in the README.md

*/


/* import dependencies via node require */
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
const productRoute = require("./routes/table1.route.js");
const productRoute = require("./routes/user.route.js");

//middleware
app.use(express.json()); //allows json to be sent in a POST request
app.use(express.urlencoded({extended:false})); //for forms? via Insomnia


//routes
app.use("/api/products", productRoute);












app.get('/', (req :any, res:any) => {
  res.send('Hello World!');
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
/*   console.log(req.body);
  res.send(req.body); */
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








/*  Executed every time the server is opened  */
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
/* end */




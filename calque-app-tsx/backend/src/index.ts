/*
For my colleagues :

If you need to include the dependencies or build artifacts, the process is detailed in the README.md

*/

const mongoose = require('mongoose'); //import via node require
mongoose.connect('mongodb+srv://calqueAdmin:IFT_3150_E24@calque.o9kagk1.mongodb.net/?retryWrites=true&w=majority&appName=Calque')
.then(()=>{console.log("Connected to the database...");})
.catch(()=>{console.log("Connection failed.");})

/* valid express javascript boilerplate code */
const express = require('express');
const app = express()
const port = 3000

//imports
const productRoute = require("./routes/table1.route.js");

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








/*   */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/* end */




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

app.get('/', (req :any, res:any) => {
  res.send('Hello World!')
})


/*   */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/* end */




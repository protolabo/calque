//const express = require('express'); //requires tells where 
const product = require("../models/table1.model.js");
const express = require('express');
const router = express.Router()
const {getProducts} = require("../controllers/table1.controller.js")

//controller functions
router.get('/', getProducts);



//export
module.exports = router;
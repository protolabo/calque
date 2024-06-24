//const express = require('express'); //requires tells where 
const product = require("../models/product.model.ts");
const router = express.Router()
const {getProducts} = require("../controllers/product.contoller.ts")

//controller fx
router.get('/', getProducts);
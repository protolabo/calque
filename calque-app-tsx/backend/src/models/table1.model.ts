/* Part of the tutorial used to create the database collections
   The tables
*/
const mongoose = require('mongoose'); //import

const ProductSchema = mongoose.Schema({
     name:{
        type:String,
        required: [true, "Please enter product name"]
     },
     quantity: {
        type: Number,
        required : true,
        default:0
     },
     price:{
        type : Number,
        require:true,
        default:0
     },
     image:{
        type : String,
        required: false
     }

});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
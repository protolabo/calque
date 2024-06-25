//function bodies

const getProducts = async(req:any, res:any) => {
    try{
        const product = await Product.find({}); //find all products
        res.status(200).json(product);
      }
      catch(e:any){
        console.log(e);
        res.status(500).json({message : e.message});
      }
}



//exports
module.exports = {
    getProducts

}
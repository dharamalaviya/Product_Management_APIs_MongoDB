const express = require("express");
const router = express.Router();
router.use(express.json());

const product = require("../models/product");
const company = require("../models/company");
const seller = require("../models/seller");

router.get("/productOfCompany", async (req,res)=>{
    const name = req.body.name;
    const details = await company.findOne({name:name});
    if(details){
        const pDetail = await product.find({product_id:details["product_id"]});
        return res.json({data:pDetail});
    }
    return res.json({data:"No data found"});
});

router.get("/productOfSeller", async (req,res)=>{
    const name = req.body.name;
    const details = await seller.findOne({name:name});
    if(details){
        const pDetail = await product.find({product_id:details["product_id"]});
        return res.json({data:pDetail});
    }
    return res.json({data:"No data found"});
});

router.post("/addProduct",(req,res)=>{
    const {addProduct} = req.body;

    if(addProduct){
        product.create(addProduct);
        return res.json({data:"New product added Successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

router.put("/updateProductCategory", async (req,res)=>{
    const pId = req.body.product_id;
    const c = req.body.category;
    const details = await product.findOne({product_id:pId});
    if(details){
        const detail = await product.findOneAndUpdate({product_id:pId , category:c});
        return res.json({data:"Product Category Update Successfully",Update : detail});
    }
    return res.json({data:"Something is wrong please try again"});
});

router.delete("/deleteProduct", async (req,res)=>{
    const pId = req.body.product_id;
    const deatils = await product.findOneAndDelete({product_id:pId});
    if(deatils){
        return res.json({data:"Product deleted successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});
module.exports = router;
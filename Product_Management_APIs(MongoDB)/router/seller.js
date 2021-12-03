const express = require("express");
const router = express.Router();
router.use(express.json());

const seller = require("../models/seller");
const product = require("../models/product");

router.post("/addseller",(req,res)=>{
    const {addSeller} = req.body;

    if(addSeller){
        seller.create(addSeller);
        return res.json({data:"New seller added successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

router.get("/sellerOfProduct", async (req,res)=>{
    const title = req.body.title;
    const details = await product.findOne({title:title});
    if(details){
        const sDetail = await seller.find({seller_id:details["seller_id"]});
        return res.json({data:sDetail});
    }
    return res.json({data:"No data found"});
});

router.put("/updateProductId", async (req,res)=>{
    const sId = req.body.seller_id;
    const pId = req.body.product_id;
    const details = await seller.findOne({seller_id:sId});
    if(details){
        const details = await seller.findOneAndUpdate({seller_id:sId , product_id:pId});
        return res.json({data:"Product_Id Update Successfully", Update : details});
    }
    return res.json({data:"No data found"});
});

router.delete("/deleteSeller", async (req,res)=>{
    const sId = req.body.seller_id;
    const details = await seller.findOne({seller_id:sId});
    if(details){
        seller.findOneAndDelete({seller_id:sId});
        return res.json({data:"Seller deleted successfully"});
    }
    return res.json({data:"No data found"});
});

module.exports = router;
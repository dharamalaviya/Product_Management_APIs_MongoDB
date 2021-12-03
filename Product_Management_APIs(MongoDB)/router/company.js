const express = require("express");
const router = express.Router();
router.use(express.json());

const company = require("../models/company");
const product = require("../models/product");

router.post("/addCompany",(req,res)=>{
    const {addCompany} = req.body;

    if(addCompany){
        company.create(addCompany);
        return res.json({data:"New company added successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

router.get("/companyOfProduct", async (req,res)=>{
    const title = req.body.title;
    const details = await product.findOne({title:title});
    if(details){
        const cDetail = await company.find({company_id:details["company_id"]});
        return res.json({data:cDetail});
    }
    return res.json({data:"No data found"});
});

router.put("/updateProductId", async (req,res)=>{
    const cId = req.body.company_id;
    const pId = req.body.product_id;
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        const details = await company.findOneAndUpdate({company_id:cId , product_id:pId});
            return res.json({data:"Product_Id updated Successfully",Update : details});
    }
    return res.json({data:"No data found"});
});

router.delete("/deleteCompany", async (req,res)=>{
    const cId = req.body.company_id;
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        company.findOneAndDelete({company_id:cId});
        return res.json({data:"Company deleted successfully"});
    }
    return res.json({data:"No data found"});
});


module.exports = router;
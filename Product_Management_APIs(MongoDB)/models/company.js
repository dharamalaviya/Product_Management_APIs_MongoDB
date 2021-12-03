const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    "company_id" : String,
    "name" : String,
    "product_id" : String
});

const companyModule = mongoose.model("company",companySchema,"company")

module.exports = companyModule;
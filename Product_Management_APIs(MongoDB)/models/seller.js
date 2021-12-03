const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
    "seller_id" : String,
    "name" : String,
    "product_id" : String
});

const sellerModule = mongoose.model("seller",sellerSchema,"seller")

module.exports = sellerModule;
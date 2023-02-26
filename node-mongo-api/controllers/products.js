const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require('dotenv').config();

// const Product = mongoose.model("Product");
const Product = require("../model/products.model");
router.get('/', (req, res) => {
  res.json({
    error: false,
    data: "Products Controller"
  })
})
router.get('/insert', (req, res) => {
  const product = new Product({
    title: 'A123',
    price: 100,
    description: 'abc123',
    imageUrl: "url123"
  })
  product.save().then(res => {
    console.log("Created Product");
    
  }).catch(err => {
    console.log(err);
  })
})
router.get('/get', (req, res) => {
  Product.find().then(res => {
    console.log(res);
  })
})
router.get('/findByid', (req, res) => {
  Product.findById("6398c5fcb78a1fe20f3e77e8").then(res => {
    console.log("Find By ID", res);
  })
})
router.get('/updateProd', (req, res) => {
  const prodId = "6398c82e440072d839281397";
  const updateTitle = 'new'
  const updatePrice = 100000
  const updateImgUrl = 'aaaaaaaaaa'
  const updateDesc = 'bbbbbbb'
  
  Product.findById(prodId).then(product => {
    product.title = updateTitle;
    product.price = updatePrice;
    product.updateImgUrl = updateImgUrl;
    product.updateDesc = updateDesc;
    return product.save();
  }).then(res => {
    console.log(res)
    console.log("updated product")
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router;
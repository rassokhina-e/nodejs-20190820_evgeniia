const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  if (ctx.query.subcategory && mongoose.Types.ObjectId.isValid(ctx.query.subcategory)) {
    let products = await Product.find({ subcategory: ctx.query.subcategory });
    if (!products.length) {
      ctx.body = { products: [] };
    }
    else {
      ctx.body = { products: products };
    }
    ctx.status = 200;
  }
};

module.exports.productList = async function productList(ctx, next) {
  let products = await Product.find({});
  if (products.length) {
    ctx.body = { products: products };
  }
  else {
    ctx.body = { products: [] };
  }
  ctx.status = 200;
};

module.exports.productById = async function productById(ctx, next) {
  if (ctx.query.id && mongoose.Types.ObjectId.isValid(ctx.query.id)) {
    let product = await Product.findById(ctx.query.id);
    if (!product) {
      ctx.status = 404;
      ctx.body = 'Not found';
    }
    else {
      ctx.status = 200;
      ctx.body = { product: product };
    }
  }
  else {
    ctx.status = 400;
  }
};


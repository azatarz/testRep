'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const superagent = require('superagent');

function cart(db, req, res, next) {
  const cartCol = db.use('cart');
  const id = req.params.id;
  commonDB.findOneByQuery(cartCol, { cartId : id })
    .then(handlecart(res))
    .catch(errorUtil.propagateError(next));
}

function handlecart(res) {
  return function(result) {
    let cart = {
      cartId: result.cartId,
      products: []
    }
      res.status(200);
      res.send(result);
      res.end();
    };
  }

// const calls = [];

//     if (result.products) {
//       if (result.products)
//         for (let i=0; i < result.products.length; i++) {
//           calls.push(getProducts(result.products[i].id));
//         }
//      }

// function getProducts(id) {
//   return superagent.get("https://onlineshopfast.myshopify.com/admin/products.json")
//     .set("Authorization",'Basic M2VhZjdjZmI5ZjcyNzMyMDFmZjFlYzZmYmY0ODI5ODE6NGRiMDgzYmIwMmNkODVmNzdhMWIyMGI1MjU4YzA2NjU=')
//     .then((result) => {
//       const resultJson = JSON.parse(result.text);
//       return ({type: 'products', id: id, title: resultJson.title});
//     });
// }




module.exports = {
  cart
};
'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const superagent = require('superagent');

function getprofile(db, req, res, next) {
  const cartCol = db.use('profile');
  const cartId = req.params.cartId;
  commonDB.findOneByQuery(cartCol, { cartId : cartId })
    .then(handleprofile(res))
    .catch(errorUtil.propagateError(next));
}

function handleprofile(res) {
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
  getprofile
};
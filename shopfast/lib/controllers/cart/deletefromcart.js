'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');

function deletefromcart(db, req, res, next) {
  const cartCol = db.use('cart');
  const cartId = req.body.cartId;
 // const productId = req.body.productId;
//const productQuantity = req.body.productQuantity;
  // const accountObj = {
  // id: req.params.id,
  // productId1: req.query.productId

  // };
//   const pushBody = {
//     'products': {
//       id: productId,
     
//     }
//   };
  commonDB.remove(cartCol,{ cartId: cartId })
  .then(respondRequest(res, 201, { code: 201, message: 'cart deleted' }))
      .catch(errorUtil.propagateError(next));

 
    //   commonDB.insert(cartCol, accountObj)
    // .then(respondRequest(res, 201, { result: 'product added to the cart', id: accountObj.id }))
    // .catch(errorUtil.propagateError(next));
}

function respondRequest(res, code, message) {
  return function (result) {
    res.status(code);
    res.send(message);
    res.end();
  };
}

module.exports = {
  deletefromcart
};

'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');

function deleteitem(db, req, res, next) {
  const cartCol = db.use('cart');
  const id = parseInt(req.params.itemId);
  const cartId= req.params.id;
  commonDB.updatePull(cartCol,
    { "cartId" : cartId},
    { products: { "id" : id } } 
)
   .then(respondRequest(res, 201, { code: 201, message: 'item deleted' }))
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
  deleteitem
};

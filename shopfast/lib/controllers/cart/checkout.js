'use strict';
const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const uuidV1 = require('uuid/v1');

function checkout(db, req, res, next) {
  const checkoutCol = db.use('checkout');
  const cartCol = db.use('cart');
  const cartId = req.body.cartId
  var date = new Date()

  const checkoutObj = {
    cartId: cartId, 
    date: date,
    location:
    {
      address: req.body.location.address,
      country: req.body.location.country,
      postalcode: req.body.location.postalcode,
    }
};
  commonDB.find(cartCol, {cartId: cartId}).
  then((result) => {
    checkoutObj.products = result[0].products;
    return commonDB.insert(checkoutCol, checkoutObj).then(respondRequest(res, 201, { result: 'Information was added'}))
  })
  .catch(errorUtil.propagateError(next));
}

function respondRequest(res, code, message) {
  return function () {
    res.status(code);
    res.send(message);
    res.end();
  };
}



module.exports = {
 checkout
};
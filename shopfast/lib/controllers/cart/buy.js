'use strict';
const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const uuidV1 = require('uuid/v1');

function buy(db, req, res, next) {
  const buyCol = db.use('buy');
  const cartCol = db.use('cart');
  const cartId = req.body.cartId
  const buyObj = {
      cartId: cartId, 
      cardnumber: req.body.cardnumber,
      namecard: req.body.namecard,
      cardid: req.body.cardid,
     
    
};
   commonDB.insert(buyCol, buyObj)
    .then(respondRequest(res, 201, { result: 'Information was added' }))
    
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
 buy
};
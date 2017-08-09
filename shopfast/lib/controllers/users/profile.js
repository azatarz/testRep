'use strict';
const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const uuidV1 = require('uuid/v1');

function profile(db, req, res, next) {
  const accountsCol = db.use('profile');
  const cartId = req.params.cartId,
  profileobj = {
    cartId : cartId,
    email: req.body.email,
    //password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    cardId: req.body.cardId,
    
        first: req.body.first,
      last: req.body.last
    
  };
// if (first=== commonDB.findOneByQuery(accountsCol, { email: email1})) {
//       res.status(409);
//       res.send({ error: 'Invalid username or password', code: 409 });
//       res.end();
//     }
  commonDB.insert(accountsCol, profileobj)
    .then(respondRequest(res, 201, { result: 'Account was added', id: profileobj.cartId }))
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
 
  profile

};









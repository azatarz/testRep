'use strict';
const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const uuidV1 = require('uuid/v1');

function contactus(db, req, res, next) {
  const accountsCol = db.use('contactus');
  const accountObj = {
    id: uuidV1(),
    email: req.body.email,
    //password: req.body.password,
    message: req.body.message,
    name: {
        first: req.body.name.first.trim().replace(/\s\s+/g, ' '),
      last: req.body.name.last.trim().replace(/\s\s+/g, ' ')
    }
  };
// if (first=== commonDB.findOneByQuery(accountsCol, { email: email1})) {
//       res.status(409);
//       res.send({ error: 'Invalid username or password', code: 409 });
//       res.end();
//     }
  commonDB.insert(accountsCol, accountObj)
    .then(respondRequest(res, 201, { result: 'Account was added', id: accountObj.id }))
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
 
  contactus

};









'use strict';
const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');
const uuidV1 = require('uuid/v1');

function getAccount(db, req, res, next) {
  const id1 = req.params.id;
  const accountsCol = db.use('accounts');
  commonDB.findOneByQuery(accountsCol, { id: id1 })
    .then(respondRequest(res, 200))
    .catch(errorUtil.propagateError(next));
}

function createAccount(db, req, res, next) {
  const accountsCol = db.use('users');
  const accountObj = {
    id: uuidV1(),
    email: req.body.email,
    password: req.body.password,
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
function resetPassword(db, req, res, next) {
  const accountsCol = db.use('users');
  const updateQuery = {
    email: req.body.email
  };
  const updateBody = {
    password: req.body.password
  };

  commonDB.update(accountsCol, updateQuery, updateBody)
    .then(resetPasswordHandler(res, 200, db, next, updateQuery))
    .catch(errorUtil.propagateError(next));
}

function resetPasswordHandler(res, code, db, next, query) {
  return function (result) {
    if (result.result.n === 0) {
      res.status(404);
      res.send({ code: 404, error: 'Email not found' });
      res.end();
    }
    else {
      const accountsCol = db.use('users');
      commonDB.findOneByQuery(accountsCol, query)
        .then(respondResetRequest(res, 200))
        .catch(errorUtil.propagateError(next));
    }
  };
}

function respondResetRequest(res, code) {
  return function (result) {
    res.status(code);
    res.send({id: result.id});
    res.end();
  };
}

module.exports = {
  getAccount,
  createAccount,
  resetPassword
};




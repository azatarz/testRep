'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');


function getsignin(db, req, res, next) {
  const email1 = req.body.email;
  const password1 = req.body.password;
  const accountsCol = db.use('users');
  commonDB.findOneByQuery(accountsCol, { email: email1, password: password1 })
    .then(signinHandler(res, 200))
    .catch(errorUtil.propagateError(next));
   
}

function signinHandler(res, code) {
  return function (result) {
    if (!result) {
      res.status(404);
      res.send({ error: 'Invalid username or password', code: 404 });
      res.end();
    }
    else {
      res.status(code);
      res.send({ id: result.id });
      res.end();
    }
  };
}

module.exports = {
  getsignin,
  signinHandler
};

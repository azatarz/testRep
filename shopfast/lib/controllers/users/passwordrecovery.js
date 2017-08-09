'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');


function passwordrecovery(db, req, res, next) {
  const email1 =req.body.email;
  
   const address1= req.body.address;
  const phone1= req.body.phone;
   const cardId1= req.body.cardId;
    
      const  first1= req.body.first;
     const last1= req.body.last;
  const accountsCol = db.use('profile');
  commonDB.findOneByQuery(accountsCol, { email: email1, address:address1, phone:phone1, cardId:cardId1 })
    .then(recoveryHandler(res, 200))
    .catch(errorUtil.propagateError(next));
   
}

function recoveryHandler(res, code) {
  return function (result) {
    if (!result) {
      res.status(404);
      res.send({ error: 'Invalid inputs', code: 404 });
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
  passwordrecovery,
  recoveryHandler
};

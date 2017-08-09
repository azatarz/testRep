'use strict';

const _ = require('underscore');
const validate = require('express-validation');
const accountValidation = require('../validation/accounts');
const exampleCtrl = require('../controllers/users/signup');
const signinCtrl = require('../controllers/users/signin');
const recoveryCtrl = require('../controllers/users/passwordrecovery');
const profileCtrl = require('../controllers/users/profile');
const getprofileCtrl = require('../controllers/users/getprofile');
validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false
});

function route(router, db) {
  router.get('/', _.partial(exampleCtrl.getExampleCode));
  router.post('/signup', _.partial(exampleCtrl.createAccount, db));
  router.post('/signin', _.partial(signinCtrl.getsignin, db));
router.put('/reset',validate(accountValidation.resetPassword), _.partial(exampleCtrl.resetPassword, db));
 router.post('/:cartId', _.partial(profileCtrl.profile, db));
 router.get('/:cartId', _.partial(getprofileCtrl.getprofile, db));
   router.post('/recovery/reset', _.partial(recoveryCtrl.passwordrecovery, db));

  return router;
}

module.exports = route;

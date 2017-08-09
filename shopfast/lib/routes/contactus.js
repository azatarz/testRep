'use strict';

const _ = require('underscore');
const validate = require('express-validation');
//const exampleValidation = require('../validation/example');
//const exampleCtrl = require('../controllers/users/signup');
//const signinCtrl = require('../controllers/users/signin');
//const productsCtrl = require('../controllers/users/products');
const contactusCtrl = require('../controllers/contactus/contactus');
validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false
});

function route(router, db) {
  //router.get('/', _.partial(exampleCtrl.getExampleCode));
  //router.post('/', _.partial(exampleCtrl.createAccount, db));
 // router.post('/signin', _.partial(signinCtrl.getsignin, db));
  //router.post('/', validate(exampleValidation.postExample), _.partial(exampleCtrl.createExample, db));
 // router.get('/products', _.partial(productsCtrl.getproducts));
 router.post('/contactus', _.partial(contactusCtrl.contactus, db));
  return router;
}

module.exports = route;

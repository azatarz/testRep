'use strict';

const _ = require('underscore');
const validate = require('express-validation');

const productsCtrl = require('../controllers/products/products');
const searchbrandCtrl = require('../controllers/products/searchbybrand');


function route(router, db) {

  router.get('/products', _.partial(productsCtrl.getproducts));
  router.get('/searchbybrand', _.partial(searchbrandCtrl.getbrand));
 //router.post('/contactus', _.partial(contactusCtrl.contactus, db));
  return router;
}

module.exports = route;

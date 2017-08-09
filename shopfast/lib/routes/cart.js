'use strict';

const _ = require('underscore');
const validate = require('express-validation');


const addtocartCtrl = require('../controllers/cart/addtocart');
const deletefromcartCtrl = require('../controllers/cart/deletefromcart');
const cartCtrl = require('../controllers/cart/cart');
const deleteitemcartCtrl = require('../controllers/cart/deleteitemfromcart');
const checkoutCtrl = require('../controllers/cart/checkout');
const buyCtrl = require('../controllers/cart/buy');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false
});

function route(router, db) {
 
  router.post('/:id', _.partial(addtocartCtrl.addtocart, db));
  router.get('/:id', _.partial(cartCtrl.cart, db));
  router.delete('/', _.partial(deletefromcartCtrl.deletefromcart, db));
  router.delete('/:id/item/:itemId', _.partial(deleteitemcartCtrl.deleteitem, db));
  router.post('/:id/checkout',_.partial(checkoutCtrl.checkout, db));
  router.post('/:id/buy',_.partial(buyCtrl.buy, db));


  return router;
}

module.exports = route;

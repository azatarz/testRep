'use strict';

const commonDB = require('../../db/common_db');
const errorUtil = require('../../errors/utils');

function addtocart(db, req, res, next) {
  const cartCol = db.use('cart');
  const cartId = req.params.id;
  const productId = parseInt(req.body.productId);
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const productTitle = req.body.productTitle;
  const pushBody = {
    'products': {
      id: productId,
      Quantity: productQuantity,
      title: productTitle,
      price: productPrice
    }
  };
  commonDB.find(cartCol, { cartId: cartId}).then((result) => {
    if(!result.length>0) {
      let newCart = {}
        newCart.cartId = cartId;
        newCart.products=[];
        newCart.products.push(pushBody.products);
        commonDB.insert(cartCol, newCart)
            .then(addProductHandler(res, 201, { result: 'Account was added' }))
            .catch(errorUtil.propagateError(next));
    }
    else {
      var found = result[0].products.some(function (el) {
        return el.id === productId;
      })
        if(found) {
          commonDB.updateSetPush(cartCol, { cartId: cartId, "products.id" : productId , "products.title": productTitle}, {"products.$.Quantity":productQuantity})
            .then(addProductHandler(res, 201, { code: 201, message: 'product added to the cart' }))
            .catch(errorUtil.propagateError(next));
        }
        else {
          commonDB.updatePush(cartCol, { cartId: cartId }, pushBody)
            .then(addProductHandler(res, 201, { code: 201, message: 'product added to the cart' }))
            .catch(errorUtil.propagateError(next));
        }
    }
  })
}

  //  commonDB.exist(cartCol, { cartId: cartId}).then((result) => {
  //    //pushBody.id = cartId;
  //     if (result){

  //       commonDB.updatePush(cartCol, { cartId: cartId }, pushBody)
  //         .then(addProductHandler(res, 201, { code: 201, message: 'product added to the cart' }))
  //         .catch(errorUtil.propagateError(next));
  //     }
  //     else {
  //       let newCart = {}
  //       newCart.cartId = cartId;
  //       newCart.products=[];
  //       newCart.products.push(pushBody.products);
  //       commonDB.insert(cartCol, newCart)
  //           .then(addProductHandler(res, 201, { result: 'Account was added' }))
  //           .catch(errorUtil.propagateError(next));
  //     }  
  //   }).catch(   
  //     errorUtil.propagateError(next))  ;
        
  //  }

function addProductHandler(res, code, message) {
  return function (result) {
    res.status(code);
    res.send(message);
    res.end();
  };
}


module.exports = {
  addtocart
};

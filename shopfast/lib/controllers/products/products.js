'use strict';
const superagent = require('superagent');

const http = require('https');

const API_Key = '3eaf7cfb9f7273201ff1ec6fbf482981';
const maxSize = 15;

function getproducts(req, res) {
  const prod = {
    prod: []
  };

superagent.get("https://onlineshopfast.myshopify.com/admin/products.json")
.set("Authorization",'Basic M2VhZjdjZmI5ZjcyNzMyMDFmZjFlYzZmYmY0ODI5ODE6NGRiMDgzYmIwMmNkODVmNzdhMWIyMGI1MjU4YzA2NjU=')
.then((result)=> {
        res.status(200);
      res.send(result.body);
      res.end();
})
  
 };
 
module.exports = {
  getproducts
};

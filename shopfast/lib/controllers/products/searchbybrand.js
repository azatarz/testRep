'use strict';
const superagent = require('superagent');

const http = require('https');

const API_Key = '3eaf7cfb9f7273201ff1ec6fbf482981';

function getbrand(req, res) {
  const prod = {
    prod: []
  };
let keyword = req.query.keyword;
superagent.get("https://onlineshopfast.myshopify.com/admin/products.json?vendor="+ keyword)
.set("Authorization",'Basic M2VhZjdjZmI5ZjcyNzMyMDFmZjFlYzZmYmY0ODI5ODE6NGRiMDgzYmIwMmNkODVmNzdhMWIyMGI1MjU4YzA2NjU=')
.then((result)=> {
        res.status(200);
      res.send(result.body);
      res.end();
})
  
 };
 
module.exports = {
  getbrand
};

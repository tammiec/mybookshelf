var express = require('express');
var router = express.Router();

module.exports = () => {
  router.get('/', function(req, res, next) {
    res.send('API is working properly');
  });
  
  return router;
};
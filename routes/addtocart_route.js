const route = require('express').Router();
var Cart = require('../cart/cart.js');
const AutModel = require('../mongo_model/automata_model.js');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();

/*
route.get('/:pid/:id',function(req,res){
  var groupID = req.params.pid;
  var productID = req.params.id;
  var sql;
  console.log('Adding to Cart ID : ' + productID);
  if(groupID == 'l')
  {
    groupID = 'laptops';
    sql = "SELECT * from laptops where id = ? ";
  }
  else if(groupID == 'm')
  {
    groupID = 'mobiles';
    sql = "SELECT * from mobiles where id = ? ";
  }
  else if(groupID == 't')
  {
    groupID = 'tvs';
    sql = "SELECT * from tvs where id = ? ";
  }
  else if(groupID == 'h')
  {
    groupID = 'hps';
    sql = "SELECT * from hps where id = ? ";
  }

  var cart = new Cart(req.session.cart ? req.session.cart : {});

  connection.query(sql,[req.params.id],function(err, result){
    cart.add(result[0], result[0].id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/'+groupID+'/'+productID);
  });
});
*/

route.get('/automata/:id', function(req,res){
  var productID = req.params.id;

  var cart = new Cart(req.session.cart ? req.session.cart : {});
      AutModel.findById(productID, function(err, product){
        if(err)
        {
          return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
      })
  
})

exports = module.exports = route;

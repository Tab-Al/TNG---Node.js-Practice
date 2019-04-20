module.exports = function(app, urlencoder){

const passport = require('../passport/passport');
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'estore'
  });
connection.connect();

var lData;
connection.query("SELECT * from laptops ORDER BY discount desc;", function(err,result,fields){
    lData=result;
});
var mData;
connection.query("SELECT * from mobiles ORDER BY discount desc;", function(err,result,fields){
    mData=result;
});
var tData;
connection.query("SELECT * from tvs ORDER BY discount desc;", function(err,result,fields){
    tData=result;
});
var hData;
connection.query("SELECT * from hps ORDER BY discount desc;", function(err,result,fields){
    hData=result;
});

app.get('/', function(req,res){
  console.log('User Viewing Main Page');
  //res.render('welcomepage', {ldata: lData, mdata: mData, tdata: tData, hdata: hData});
  res.render('homepage');
});

app.get('/contactus',function(req,res){
  console.log('User at Contact Us page');
  res.render('contactus');
});

app.get('/checkout',function(req,res){
  res.render('checkout');
});


};

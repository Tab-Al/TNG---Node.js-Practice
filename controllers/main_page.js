module.exports = function(app, urlencoder){

const passport = require('../passport/passport');
const Aut = require('../mongo_model/automata_model');

app.get('/', function(req,res){
  console.log('User Viewing Main Page');
  var autProd = Aut.find(function(err, autProd){
    res.render('homepage', {autProd : autProd});
  });
});

app.get('/contactus',function(req,res){
  console.log('User at Contact Us page');
  res.render('contactus');
});

app.get('/checkout',function(req,res){
  res.render('checkout');
});


};

const route = require('express').Router();
const checkAuthentication = require('../config/auth');
const UserModel = require('../mongo_model/users_schema');


route.get('/', checkAuthentication.ensureAuthenticated, function(req,res){
  res.render('user_view.ejs');
});

route.post('/updateUserInfo', (req,res)=>{

	UserModel.findOne( {email : req.body.email })
    .then( user => {
      if(user) 
      {
        user.username = req.body.username;
        user.phone = req.body.phone;

        user.save()
            .then( user => {
              console.log('User Info Updated')
              res.redirect('/users');
            });
      }
     });
});
exports = module.exports = route;

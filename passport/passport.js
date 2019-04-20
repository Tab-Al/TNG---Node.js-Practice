var passport = require('passport');
const strategy = require('./strategies');
const UserModel = require('../mongo_model/users_schema');

passport.use(strategy.fbs);

passport.use(strategy.ls);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err,user){
  	done(err,user);
  });
});

exports = module.exports = passport;

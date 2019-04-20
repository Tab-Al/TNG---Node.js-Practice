const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');
const UserModel = require('../mongo_model/users_schema');

const ls = new LocalStrategy({ usernameField: 'email' }, function(email, password, done){
  
  UserModel.findOne( {email: email} )
    .then(user => {
      if(!user){
          return done(null, false, {message: 'That email is not registered'});
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;

        if(isMatch){
          return done(null,user);
        }
        else{
          return done(null,false, {message: 'Password Incorrect'});
        }
      });
    });  
});


let fbs = new FacebookStrategy({
  clientID : config.fb.clientID,
  clientSecret : config.fb.clientSecret,
  callbackURL : config.fb.callbackURL,
  profileFields : config.fb.profileFields
  }, (accessToken, refreshToken, profile, done)=>{

  UserModel.findOne( { profileId : profile.id })
    .then(result =>{
      if(result)
      {
        console.log('FB Login : User Found');
        done(null, result);
      }
      else
      {
        console.log("FB Login : New User");

        let newUser = new UserModel({
          profileId   : profile.id,
          username    : profile.displayName,
          email       : profile.emails[0].value,
          profilePic  : profile.photos[0].value || '',
          phone       : '',
          provider    : 'facebook'
        });

        newUser.save()
          .then( user => {
            console.log('New FB user registered');
            done(null, user);
          })
          .catch(err=>console.log(err));
      }
    });
});

/*
const gs = new GoogleStrategy({}, function(){

});
*/
module.exports = { ls, fbs };
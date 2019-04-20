const route = require('express').Router();
const passport = require('../passport/passport');
const UserModel = require('../mongo_model/users_schema');
const SubjectModel = require('../mongo_model/subjects_schema');
const bcrypt = require('bcryptjs');
var dialog = require('dialog');



// trying to login
route.get('/',(req,res) => {
  res.render('login');
});

// trying to signup
route.get('/signup',(req,res) => {
  console.log('User viewing SignUp page');
  res.render('register');
});


// facebook-login
route.get('/facebook', (req,res,next)=>{
  console.log('User Loggin in using FB')
  passport.authenticate('facebook', {scope: 'email'})(req,res,next);
});

// facebook-login callback
route.get('/facebook/callback', (req,res,next)=>{
  passport.authenticate('facebook', { 
    successRedirect: '/' , 
    failureRedirect: '/login' ,
    failureFlash: true
  })(req,res,next);
});


// submit local-login form
route.post('/', (req,res,next) => {
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true
  })(req,res,next);
});

// submit signup form
route.post('/signup', function(req,res){
  const { email,username,password,phone,dob } = req.body;
  
  // to store errors in submitted form
  let errors = [];
  // check reqd fields
  if(!username || !email || !phone || !password || !dob)
  {
    errors.push({msg : 'Please fill all fields'});
  }
  // check password length
  if(password.length < 6)
  {
    errors.push({msg : 'Password is less than 6 characters long'});
  }

  if(errors.length > 0)
  {
    console.log('Errors found in Signup form, try again');
    res.render('register', { errors, email, username, password, phone, dob });
  }
  else
  {
    // find existing email id, else store in db
    UserModel.findOne( {email : email })
    .then( user => {
      if(user) 
      {
        errors.push({msg: 'E-Mail address is already registered'});
        res.render('register',{ errors, email, username, password, phone, dob });
      }
      else
      {
        const newUser = new UserModel({ 
          username: username,
          email: email,
          password: password,
          dob: dob,
          phone: phone
        });

        // generate hashed password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err,hash) => {
          if(err) throw err;
          newUser.password = hash;

          // save new user
          newUser.save()
            .then( user => {
              console.log('New User Registered.')
              req.flash('success_msg', 'You are now registered. Please login');
              res.redirect('/login');
            })
            .catch(err => console.log(err));
        }));
      }
    });
  } 
});


//logout route
route.get('/logout',function(req,res){
  req.user = null;
  req.session.cart = null;
  req.logout();
  req.flash('success','You are logged out');
  console.log('User Logged Out');
  res.redirect('/login');
});

exports = module.exports = route;

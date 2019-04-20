var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var controller1 = require( './controllers/main_page');
var controller2 = require( './controllers/each_product_page');
var controller3 = require( './controllers/adminpanel');
var validator = require('express-validator');
const mongoose = require('mongoose');

var app = express();
var urlencoded = bodyParser.urlencoded({extended : true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

//DB Config
const db = require('./config/keys').MongoURI;


//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
	.then( ()=> console.log('MongoDB Connected...') )
	.catch( err => console.log(err) );


//Connect to MySQL DB
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();
var sessionStore = new MySQLStore({}, connection);


//set up template engine
app.set('view engine', 'ejs');


// Express Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true  
}));

// Connect Flash messages
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

/* One way to define global variables
app.get('*', function(req,res,next){

  res.locals.user = req.user || null;
  res.locals.session = req.session || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
*/
// Define Global Variables
app.use( (req,res,next)=>{
  res.locals.user = req.user || null;
  res.locals.session = req.session || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// fire controllers
controller1(app, urlencoded);
controller2(app, urlencoded);
controller3(app, urlencoded);

// static files
app.use(express.static('./assets'));

// specify routes
app.use('/addwallet', require('./routes/addwallet'));
app.use('/users', require('./routes/individual_user_route'));
app.use('/addtocart', require('./routes/addtocart_route'));
app.use('/login', require('./routes/login_route'));
app.use('/cart',require('./routes/cart_route'));
app.use('/checkout',require('./routes/checkout_route'));
app.use('/contact/send',require('./routes/contact_route'));
app.get('*', (req,res,next)=>{
  res.sendFile(process.cwd() + '/views/404.html');
})

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log('Server at Port : ' + PORT + ' started'));
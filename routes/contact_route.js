const route = require('express').Router();
const nodemailer = require('nodemailer');

route.get('/', function(req,res){
	res.render('contactus.ejs');
})

route.post('/',function(req,res){

	var transporter = nodemailer.createTransport({
		service	: 'gmail',
		host: "smtp.gmail.com",
		auth	: {
					user : "tabish.al97@gmail.com",
					pass : "Chachi420"
				}
	});

	var mailOptionsToAdmin = {

		from	: 'Tab_Al <tabish.al97@gmail.com>',
		to 		: 'tabish.al97@gmail.com',
		subject : 'Website Contact Us',
		text	: 'Name : ' + req.body.username + ' Email: ' + req.body.mail + ' has msg : ' + req.body.msg
		//html	: '<h1>Name : ' + req.body.username + '</h1> <h3> Email: ' + req.body.mail + '</h3>'
	}

	var mailOptionsToUser = {

		from	: 'Tab_Al <tabish.al97@gmail.com>',
		to 		: req.body.mail,
		subject : 'Website Contact Us',
		text	: 'Thank You for Connecting'
		//html	: '<h1>Name : ' + req.body.username + '</h1> <h3> Email: ' + req.body.mail + '</h3>'
	}

	transporter.sendMail(mailOptionsToAdmin,function(err,info){
		if(err)
		{
			console.log(err);
			res.redirect('/contact/send');
		}
		else
		{
			console.log('Msg Sent To Admin');
			res.redirect('/contact/send');
		}
	});

	transporter.sendMail(mailOptionsToUser,function(err,info){
		if(err)
		{
			console.log(err);
			res.redirect('/contact/send');
		}
		else
		{
			console.log('Msg Sent To User');
			res.redirect('/contact/send');
		}
	});
});

exports = module.exports = route;
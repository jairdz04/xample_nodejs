"use strict";
var nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

/*
function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        };

*/
exports.send = function(request, response){
	var transporter = nodemailer.createTransport({
	service: "gmail",
		auth: {
			user : "testapi201704@gmail.com",
			pass: ""
		}
	});

	var user = {
		nombre: "jair diaz",
		email: request.body.email
	};

	var token = jwt.sign(user,process.env.SECRET_KEY,{
		expiresIn: 400
	});		

//	console.log(parseJwt(token));

	var mailOptions = {
		from: request.body.from,
		to: request.body.to,
		subject: request.body.subject,
		text: token
	};

		
	//console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			response.json({success: false, sendMessage: false});
		}else{
			response.json({success: true, sendMessage: true});
		}
	});
};



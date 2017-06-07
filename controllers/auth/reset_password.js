"use strict";
var nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

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

	var mailOptions = {
		from: "testapi201704@gmail.com",
		to: request.body.to,
		subject: "recuperacion de contraseña",
		text: "http://localhost:8383/"+ token
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


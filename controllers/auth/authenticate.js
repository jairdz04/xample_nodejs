var crypto = require("crypto"), algorithm = "aes-256-ctr" ,password_crypto = "d6F3Efeq";
var jwt = require('jsonwebtoken');
var connection = require("../connection.js");


exports.authenticate = function (request, response){
	if(!request.body.email || !request.body.password){
		return response.status(400).send("Debes enviar las credenciales");		
	}else{

		var	email = request.body.email;
		var password =request.body.password;
		connection.getConnection(function(error, tempCont){
		if(error){
			console.log("Error");
			tempCont.release();
		}else{
			console.log("connected");
			tempCont.query("SELECT * FROM users WHERE email = ? LIMIT 1 ", email, function(error, rows){
				if(error){
					console.log("Error in query");
				}else{
					if(!rows){
						return response.status(401).send("Email inexistente");
					}
					var decipher = crypto.createDecipher(algorithm,password_crypto);
			  		var dec = decipher.update(rows[0].password,'hex','utf8');
			  		dec += decipher.final('utf8');
					

					if(dec!== password){
						return response.status(401).send("El email o la constraseña no coinciden");
					}

					var token = jwt.sign(rows[0], process.env.SECRET_KEY,{
						expiresIn: 4000
					});		
						response.status(201).json({
						success: true,
						token: token	
					});

				}
			});
		}
	});
  }	
	
};


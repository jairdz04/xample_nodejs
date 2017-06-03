var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
var connection = require("../connection.js");



//verificar que el usuario exista, verificar respuestas de server status
exports.authenticate = function (request, response){
		var	email = request.body.email;
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(request.body.password, salt);
//		var password = request.body.password

	if(!email || !request.body.password){
		return response.status(400).send("Debes enviar las credenciales");		
	}else{
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
					console.log(password);
					console.log(rows[0].password);
					if(password !== rows[0].password){
						return response.status(401).send("la contraseña o el email no coinciden");
					}

					var token = jwt.sign(rows, process.env.SECRET_KEY, {
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


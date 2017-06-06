var crypto = require("crypto"),algorithm = "aes-256-ctr" ,password_crypto = "d6F3Efeq";
var connection = require("./connection.js");
	
exports.getUsers = function(request,response){
	var us = [];
	connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					console.log("connected");

					tempCont.query("SELECT * FROM users", function(error, rows){
						tempCont.release();
						if(error){
								console.log("Error in query");
						}else{
								var i = 0;
								for(user in rows){
										us.push({"id":rows[i].id , "email": rows[i].email, "nombre": rows[i].nombre});
										i++;
								}
								response.json(us);
						}
					});
			}
		});
};

exports.getUserByID = function(request, response){
	var us = [];
	var email = request.body.email;
	connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					console.log("connected");
					tempCont.query("SELECT * FROM users WHERE email = ? ",email , function(error, rows){
						tempCont.release();
						if(error){
								console.log("Error in query");
						}else{
								var i = 0;
								for(user in rows){
										us.push({"id":rows[i].id , "email": rows[i].email, "nombre": rows[i].nombre});
										i++;
								}
								response.json(us);
						}
					});
			}
		});
};

exports.postUser = function(request, response){
	var password = request.body.password;
	var cipher = crypto.createCipher(algorithm,password_crypto)
  	var crypted = cipher.update(password,'utf8','hex')
  	crypted += cipher.final('hex');

	var user = {
			email:request.body.email,
			nombre:request.body.nombre,
			password: crypted
	};

	connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					console.log("connected");
					tempCont.query("INSERT INTO users SET ?",user , function(error, rows){
						if(error){
								tempCont.release();
								console.log("Error in query - insert - ");
						}else{
								tempCont.release();
								response.json({"messagge": "hecho"});
						}
					});
			}
		});
};



exports.updateUser = function(request, response){
	var id = request.params.id;
	var password = request.body.password;
	var cipher = crypto.createCipher(algorithm,password_crypto);
  	var crypted = cipher.update(password,'utf8','hex');
  	crypted += cipher.final('hex');


	connection.getConnection(function(error, tempCont){
		var user = {
            email    : request.body.email,
            nombre : request.body.nombre,
            password   : crypted
        };
        if(error){
			console.log("Error");
			tempCont.release();
		}else{
			tempCont.release();
			connection.query("UPDATE users set ? WHERE id = ? ", [user,id], function(error, rows){
				if(error){
					console.log("error updating");
				}else{
					response.json({"messagge": "update hecho"});
				}
			});
		}
	});

}



exports.deleteUser = function (request, response){
		var id = request.params.id;
		connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					tempCont.release();
					connection.query("DELETE FROM users WHERE id = ?", [id], function(error,rows){
						if(error){
							console.log("Error in query -Delete-");
						}else{
							response.json({"messagge": "delete hecho"});
						}
					});
			}
		});

}



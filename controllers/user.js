//var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//var connection = require("../controllers/connection.js");
var mysql = require("mysql");
var connection = mysql.createPool({
		connectionLimit: 50,
		host: 'localhost',
        user: 'root',
        password : '',
        database:'nodejs'
});


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

exports.postUser = function(request, response){
	//console.log(request.body);
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(request.body.password, salt);
	var user = {
			email:request.body.email,
			nombre:request.body.nombre,
			password: password
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
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(request.body.password, salt);
	connection.getConnection(function(error, tempCont){
		var user = {
            "email"    : request.body.email,
            "nombre" : request.body.nombre,
            "password"   : password
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
					response.redirect("/users");
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
							//response.redirect('/users');
							response.json({"messagge": "delete hecho"});
						}
					});
			}
		});

}



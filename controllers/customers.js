//var connection = require("../controllers/connection.js");
var mysql = require("mysql");
var connection = mysql.createPool({
		connectionLimit: 50,
		host: 'localhost',
        user: 'root',
        password : '',
        database:'nodejs'
});

exports.getCustomers = function (request, response){
		connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					console.log("connected");
					tempCont.query("SELECT * FROM customer", function(error, rows){
						tempCont.release();
						if(error){
								console.log("Error in query");
						}else{
								response.json(rows);
						}
					});
			}
		});
};

exports.postCustomer = function(request, response){
	connection.getConnection(function(error, tempCont){
		  var data = {
            "name"    : request.body.name,
            "address" : request.body.address,
            "email"   : request.body.email,
            "phone"   : request.body.phone 
        };

		if(error){
			console.log("Error");
			tempCont.release();
		}else{
			tempCont.release();
			connection.query("INSERT INTO customer set ? ", data, function(error, rows){
				if(error){
					console.log("error inserting");
				}else{
					response.json({"messagge": "insert hecho"});
					response.redirect("/customers");
				}
			});
		}
	});
}

exports.updateCustomer = function (request, response){
	var id = request.params.id;
	console.log(id);
	connection.getConnection(function(error, tempCont){
		var data = {
            "name"    : request.body.name,
            "address" : request.body.address,
            "email"   : request.body.email,
            "phone"   : request.body.phone 
        };
        if(error){
			console.log("Error");
			tempCont.release();
		}else{
			tempCont.release();
			connection.query("UPDATE customer set ? WHERE idcustomer = ? ", [data,id], function(error, rows){
				if(error){
					console.log("error updating");
				}else{
					response.json({"messagge": "update hecho"});
					response.redirect("/customers");
				}
			});
		}
	});
}

exports.deleteCustomer = function (request, response){
	var id = request.params.id;
		connection.getConnection(function(error, tempCont){
			if(error){
				console.log("Error");
				tempCont.release();
			}else{
					tempCont.release();
					connection.query("DELETE FROM customer WHERE idcustomer = ?", [id], function(error,rows){
						if(error){
							console.log("Error in query -Delete-");
						}else{
							res.redirect('/customers');
							response.json({"messagge": "delete hecho"});
						}
					});
			}
		});

}
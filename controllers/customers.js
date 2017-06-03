var mysql = require("mysql");
var connection = require("./connection.js");

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

        console.log(data);
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
							response.json({"messagge": "delete hecho"});
						}
					});
			}
		});

}
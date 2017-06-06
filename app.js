var express = require("express");
var app = express();
var cors = require("cors");
var routes = require("./routes/routes.js");
var corsOptions = {
	origin: "http://localhost:8383",
	optionSuccessStatus: 200
}
app.use("/api",cors(corsOptions),routes);
app.listen(3000);

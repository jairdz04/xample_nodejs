var express = require("express");
var app = express();
var routes = require("./routes/routes.js");
app.use("/api", routes);
app.listen(3000);

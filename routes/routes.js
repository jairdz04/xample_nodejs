var express = require("express");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();


//Customers routes
var customers = require('../controllers/customers');
router.get('/customers', customers.getCustomers);
router.get('/customers/delete/:id', customers.deleteCustomer);
router.post('/customers/add', urlencodedParser, customers.postCustomer);
router.post('/customers/edit/:id',urlencodedParser,customers.updateCustomer);

//Auth routes
var user = require("../controllers/user.js");
router.get("/users", user.getUsers);
router.get('/users/delete/:id', user.deleteUser);
router.post("/users/add", urlencodedParser ,user.postUser);
router.post('/users/edit/:id',urlencodedParser,user.updateUser);


module.exports = router



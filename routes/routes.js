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






module.exports = router



var uuid =  require('node-uuid');
var serveStatic = require('node-static');
var fileServer = new serveStatic.Server('./public');
var express = require('express');
var bodyParser = require('body-parser');

var customers = [
	{ id: uuid.v4(), name: 'William Shakespeare', product: { name: 'Grammatical advice' }, joinedTime: new Date().toString() },
	{ id: uuid.v4(), name: 'Sherlock Holmes', product: { name: 'Magnifying glass repair' }, joinedTime: new Date().toString() },
	{ id: uuid.v4(), name: 'Alan Turing', product: { name: 'Cryptography advice' }, joinedTime: new Date().toString() },
];

var servedCustomers = [

];

function serveCustomer(id) {
	customers = customers.filter(function (customer) {
		if (customer.id === id) {
			customer.status = 'served';
			servedCustomers.push(customer);
			return false;
		} else {
			return true;
		}
	});
}

function addCustomer(customer) {
	customer.id = uuid.v4();
	customer.joinedTime = new Date().toString();
	customers.push(customer);
}

function removeCustomer(targetCustomerId) {
	customers = customers.filter(function (customer) {
		return customer.id !== targetCustomerId;
	});
	servedCustomers = servedCustomers.filter(function (servedCustomers) {
		return servedCustomers.id !== targetCustomerId;
	});
}

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/customers', function (req, res) {
	res.send(customers);
});
app.get('/api/customers/served', function (req, res) {
	res.send(servedCustomers);
});
app.post('/api/customer/add', function (req, res) {
	addCustomer(req.body);
	res.end('Customer was added!');
});		
app.put('/api/customer/serve', function (req, res) {
	serveCustomer(req.body.id);
	res.end('Customer was served!');
});
app.delete('/api/customer/remove', function (req, res) {
	removeCustomer(req.query.id);
	res.end('Customer was removed!');
});

app.use(function (req, res) {
	req.addListener('end', function () {
		fileServer.serve(req, res);
	}).resume();
});

app.listen(1337);
console.log('Server is running @ 127.0.0.1:1337...');
console.log('Good luck!');

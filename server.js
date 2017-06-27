const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var logs = `${now}: ${req.method} ${req.url}`;
	console.log(logs);
	fs.appendFile('server.log', logs + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log' + err + '\n');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
//	res.send('<h1>Hello express</h1>');
	res.render('home.hbs', {
		page_title: "Home Page",
		welcomeMessage: "Welcome to my website"
	});
});

app.get('/about', (req, res) => {
//	res.send("about page");
	res.render('about.hbs', {
		page_title: "About Page",
		current_year: "2017"
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on 3000 port');
});

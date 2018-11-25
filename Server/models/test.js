const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostifyMusic', {useNewUrlParser: true });
const friends = require('./friends');
const chatRecords = require('./chatRecords');
const isRead = require('./isRead');
const users = require('./users');


users.find(function (err, users) {
	if (err) return console.error(err);
	console.log(users);
});

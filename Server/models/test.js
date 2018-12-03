const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostifyMusic', {useNewUrlParser: true });
const friends = require('./friends');
const chatRecords = require('./chatRecords');
const isRead = require('./isRead');
const users = require('./users');
const sockets = require('./socketRecords');



chatRecords.findOneAndDelete({message: 'Hey'}, function(err, c){
	console.log(c);
}) // executes


/* eslint-disable no-console */
const mongoose = require('mongoose');
const friends = require('./models/friends');
const chatRecords = require('./models/chatRecords');
const isRead = require('./models/isRead');
const users = require('./models/users');
const chat = require('./routes/chat');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser =  require("body-parser");
const server = require('http').Server(app);
const io = require('socket.io').listen(server);


/*	set port */
server.listen(3333);


/*	allow custom header and CORS	*/
app.use(cors());


/*	process http request to different url	*/
app.use('/chat', chat);



/*	connect to db*/
mongoose.connect('mongodb://localhost:27017/PostifyMusic', {useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected');
});


/* GET home page. */
app.get('/', function (req, res) {
	res.send('server home page')
});


/*	process chat logic	*/
const friendList = {'01': ['02', '03', '04'],
	'02': ['01', '04'],
	'03': ['01'],
	'04': ['01', '02']};
const friendsSocket = {};
const friendsId = {};
const friendsOnline = [];
io.on('connection', function (socket) {
	// when friend are logging in
	socket.on('friendOn', function (data) {
		// if username exists, legal
		if (friendsOnline.indexOf(data.sender) === -1){
			if (Object.keys(friendList).indexOf(data.sender) !== -1) {
				// save his id and socket for disconnection
				friendsId[socket] = data.sender;
				friendsSocket[data.sender] = socket;

				// 应该保存他在线上的状态 这样后面登录的人也知道他是上线的
				friendsOnline.push(data.sender);
				console.log(data.sender+' is online');

				// tell the clients that he is online
				io.emit('colorHead', friendsOnline)
			} else {
				console.log('no this user in server')
			}
		} else {
			console.log('already logged in')
		}
	});

	// get message
	socket.on('send a message', function (data) {
		var sender = data.sender;
		var receiver = data.receiver;
		console.log(data.sender+' '+data.msg+' '+data.receiver);
		friendsSocket[receiver].emit('receive a message',
			{sender: sender, receiver: receiver, msg: data.msg})
	});

	// disconnect
	socket.on('disconnect', function(){
		//display that he is offline
		var friend = friendsId[socket];

		// remove from friendsOnline friendsId friendsSocket
		var idx = friendsOnline.indexOf(friend);
		friendsOnline.splice(idx, 1);
		delete friendsId[socket];
		delete friendsSocket[friend];

		console.log("dis  "+friend);
		io.emit('grayHead', friend)

	})
});


app.use(bodyParser.json());
module.exports = app;


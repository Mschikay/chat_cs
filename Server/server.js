/* eslint-disable no-console */
const mongoose = require('mongoose');
const friends = require('./models/friends');
const chatRecords = require('./models/chatRecords');
const isRead = require('./models/isRead');
const users = require('./models/users');
const sockets = require('./models/sockets');
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
const friendsSocket = {};
const friendsId = {};
const friendsOnline = [];
io.on('connection', function (socket) {

	// when friend are logging in
	socket.on('friendOn', function (data) {
		if (friendsOnline.indexOf(data.sender) === -1){
			console.log(data.sender+' is online');

			// save his id and socket for disconnection
			friendsId[socket] = data.sender;
			friendsSocket[data.sender] = socket;
			friendsOnline.push(data.sender);

			let socketRecord = new sockets({
				user_id: data.sender,
				socketInfo: socket
			});
			socketRecord.save(function(err){
				console.log(err)
			})

		} else {
			console.log('already logged in')
		}
	});

	//load history
	socket.on('load history', function (data) {
		chatRecords.find(
			{
				user_id: data.sender,
				friend_id: data.receiver,
			},
			['sendOrRecv', 'message'],
			{
				sort: {'_id': 1}
			},
			function (err, c){
				if (err){
					console.log(err)
				}else{
					socket.emit('get history', c)
				}
			})
	});
	// get message
	socket.on('send a message', function (data) {
		var sender = data.sender;
		var receiver = data.receiver;
		console.log(data.sender+' '+data.msg+' '+data.receiver);

		let sendRecord = new chatRecords({
			user_id: data.sender,
			friend_id: data.receiver,
			message:  data.msg,
			sendOrRecv: 'send'
		});
		let recvRecord = new chatRecords({
			user_id: data.receiver,
			friend_id: data.sender,
			message:  data.msg,
			sendOrRecv: 'receive'
		});
		sendRecord.save(function(err){
			if(err){
				console.log(err)
			}else{
				console.log('saved!')
			}
		});
		recvRecord.save(function(err){
			if(err){
				console.log(err)
			}else{
				console.log('saved!')
			}
		});

		sockets.findOne({user_id: data.receiver}, function (err, s){
			if (err){
				console.log('your friend is offline')
			}else if(s.socketInfo === {} || s.socketInfo === undefined || s.socketInfo===null) {
				console.log('your friend is offline')
			}else{
				s.socketInfo.emit('receive a message',
					{sender: sender, receiver: receiver, msg: data.msg})
			}
		});
	});

	// disconnect
	socket.on('disconnect', function(){
		var friend = friendsId[socket];
		var idx = friendsOnline.indexOf(friend);
		friendsOnline.splice(idx, 1);
		delete friendsId[socket];
		delete friendsSocket[friend];

		sockets.findOneAndUpdate(
			{socketInfo: socket},
			{$set: {socket: {}}},
			{new: true},
			function (err, s){
			if (err){
				console.log('Something abnormal')
			}else{
				console.log(s)
			}
		});

		console.log(friend+" is offline");

	})
});


app.use(bodyParser.json());
module.exports = app;


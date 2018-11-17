/* eslint-disable no-console */

const express = require('express')
const app = express()
const bodyParser =  require("body-parser")

const server = require('http').Server(app)
server.listen(3333)
const io = require('socket.io').listen(server)


var chat = require('./routes/chat')
app.use('/chat', chat)
app.use(bodyParser.json())

//allow custom header and CORS
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');     // 跨域请求的域名端口号
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	if (req.method === 'OPTIONS') {
		res.send(200);
	}
	else {
		next();
	}
})

/* GET home page. */
app.get('/', function (req, res) {
	res.send('server home page')
})

// global variable, my friend list
// used to update the friend list and send/receive messages
const friendList = {'01': ['02', '03', '04'],
	'02': ['01', '04'],
	'03': ['01'],
	'04': ['01', '02']}

const friendsSocket = {}
const friendsId = {}
const friendsOnline = []
io.on('connection', function (socket) {
	// when friend are logging in
	socket.on('friendOn', function (data) {
		// if username exists, legal
		if (friendsOnline.indexOf(data.sender) == -1){
			if (Object.keys(friendList).indexOf(data.sender) !== -1) {
				// save his id and socket for disconnection
				friendsId[socket] = data.sender
				friendsSocket[data.sender] = socket

				// 应该保存他在线上的状态 这样后面登录的人也知道他是上线的
				friendsOnline.push(data.sender)
				console.log(data.sender+' is online')

				// tell the clients that he is online
				io.emit('colorHead', friendsOnline)
			} else {
				console.log('no this user in server')
			}
		} else {
			console.log('already logged in')
		}
	})

	// get message
	socket.on('send a message', function (data) {
		var sender = data.sender
		var receiver = data.receiver
		console.log(data.sender+' '+data.msg+' '+data.receiver)
		friendsSocket[receiver].emit('receive a message',
			{sender: sender, receiver: receiver, msg: data.msg})
	})

	// disconnect
	socket.on('disconnect', function(){
		//display that he is offline
		var friend = friendsId[socket]

		// remove from friendsOnline friendsId friendsSocket
		var idx = friendsOnline.indexOf(friend)
		friendsOnline.splice(idx, 1)
		delete friendsId[socket]
		delete friendsSocket[friend]

		console.log("dis  "+friend)
		io.emit('grayHead', friend)

	})
})

module.exports = app


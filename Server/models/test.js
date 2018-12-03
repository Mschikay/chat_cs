const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostifyMusic', {useNewUrlParser: true });
const friends = require('./friends');
const chatRecords = require('./chatRecords');
const isRead = require('./isRead');
const users = require('./users');


friends.find(function (err, users) {
	if (err) return console.error(err);
	console.log(users);
});

var c1 = new chatRecords({
	user_id: "5c04957684424f1b94d62ad8",
	friend_id: "5c049632ac50631ba0558fed",
	message: "Do you have due today?",
	sendOrRecv: "receive"
});
var c2 = new chatRecords({
	user_id: "5c04957684424f1b94d62ad8",
	friend_id: "5c049632ac50631ba0558fed",
	message: "Of course!",
	sendOrRecv: "send"
});
var c3 = new chatRecords({
	user_id: "5c04957684424f1b94d62ad8",
	friend_id: "5c049632ac50631ba0558fed",
	message: "ahahahhahahahahahahah",
	sendOrRecv: "send"
});
var c4 = new chatRecords({
	user_id: "5c049632ac50631ba0558fed",
	friend_id: "5c04957684424f1b94d62ad8",
	message: "Do you have due today?",
	sendOrRecv: "send"
});
var c5 = new chatRecords({
	user_id: "5c049632ac50631ba0558fed",
	friend_id: "5c04957684424f1b94d62ad8",
	message: "Of course!",
	sendOrRecv: "receive"
});
var c6 = new chatRecords({
	user_id: "5c049632ac50631ba0558fed",
	friend_id: "5c04957684424f1b94d62ad8",
	message: "ahahahhahahahahahahah",
	sendOrRecv: "receive"
});

c1.save()
c2.save()
c3.save()
c4.save()
c5.save()
c6.save()

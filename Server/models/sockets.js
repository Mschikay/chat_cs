const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/PostifyMusic', {useNewUrlParser: true });
const friends = require('./friends');
const chatRecords = require('./chatRecords');
const isRead = require('./isRead');
const users = require('./users');

const socketSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	socketInfo: {
		type: Object,
		default: {}
	}
});

module.exports = mongoose.model('sockets', socketSchema);


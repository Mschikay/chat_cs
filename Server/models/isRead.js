const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = require('./users');

const isReadSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	friend_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	newMessage:  {type: Boolean, default: false}
});

module.exports = mongoose.model('isRead', isReadSchema);

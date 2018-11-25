const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = require('./users');


mongoose.model('Question',
	new Schema({ url: String, text: String, id: Number}),
	'question');

const friendSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	friend_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = Friend = mongoose.model('friends', friendSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRecordsSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	friend_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	message:  String
});

module.exports = mongoose.model('chatRecords', chatRecordsSchema);

const friends = require('../models/friends');
const users = require('../models/users');
const express = require('express');
const router = express.Router();

/* GET home page of chat module. */
router.get('/', function (req, res) {
	var myEmail = req.param('email');
	users.findOne({email: myEmail}, function(err, u){
		if (err || u === null || u === undefined){
			res.send(err);
		}else{
			// get my friends
			friends.find({user_id: u._id}).populate('friend_id').exec(function(err, friend){
				if (err){
					console.log("error occurred");
					res.send(err);
				}else{
					// console.log(friend);
					res.send(
						{
							'friend': friend,
							'me': u
						});
				}
			});
		}
	})
});



module.exports = router;

const express = require('express')
const router = express.Router()
const app = express()
const server = require('http').createServer(app)
server.listen(4000)

/* GET home page of chat module. */
router.get('/', function (req, res) {
	res.send('Express RESTful API')
})

/* /chat/login */
router.post('/login', function (req, res) {
	console.log('==req.query==', req.query)
	let data = {
		msg: 'succ'
	}
	res.send(data)
})



module.exports = router

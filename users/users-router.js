const express = require("express")
const Users = require("./users-model")
const validation = require('../middleware/validation');
const router = express.Router()

router.get("/", validation, async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router

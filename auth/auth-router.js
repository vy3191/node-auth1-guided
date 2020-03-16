const express = require("express")
const Users = require("../users/users-model");
const bcrypt = require('bcryptjs');
const {session, validation} = require('../middleware/validation');
const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first();    
		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		
		const user = await Users.findBy({ username }).first()
    const isUserPasswordValid = await bcrypt.compare(password, user.password);
		if (!user || !isUserPasswordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		const authToken = Math.random();
		session[authToken] = user.id;
		res.setHeader('Authorization', authToken);
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router

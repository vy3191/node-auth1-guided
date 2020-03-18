const express = require("express")
const Users = require("./users-model")
const {validation} = require('../middleware/validation');
const router = express.Router()

router.get("/", validation, async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.get("/logout", validation, (req,res,next) => {
	  req.session.destroy( (err) => {
			 if(err) {
				 next(err);
			 } else {
				 res.json({
					  message:"successfully logged out"
				 })
			 }
		})
});

module.exports = router

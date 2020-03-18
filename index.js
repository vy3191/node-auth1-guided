const express = require("express");
const session = require("express-session");
const helmet = require("helmet")
const dbConfig = require('./database/config');
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express()
const port = process.env.PORT || 5000

server.use(cors())
server.use(helmet())
server.use(express.json());
server.use(session({
	 name:'token', //overwrite the default cookie name, hides our stack 
	 resave: false,
	 saveUninitialized:false, // GDPR laws against setting cookies automatically.
	 secret: "keep it secret it secret, keep it safe",
	 cookie: {
		//  maxAge: 15 * 1000,
		 httpOnly: true,
	 },
	 store: new KnexSessionStore({
		 knex: dbConfig, // configure instance of knex
		 createtable:true, //If the session table doesn't exist, create it automatically
	 })

}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})

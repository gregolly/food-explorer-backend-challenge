const { Router } = require('express')

const usersRouter = require('./users.routes')
const sessionRouter = require("./sessions.routes")

const router = Router()

router.use('/users', usersRouter)
router.use("/sessions", sessionRouter)

module.exports = router
const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRouter = require('./dishes.routes')
const sessionRouter = require("./sessions.routes")

const router = Router()

router.use('/users', usersRouter)
router.use("/sessions", sessionRouter)
router.use('/dishes', dishesRouter)

module.exports = router
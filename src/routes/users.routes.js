const { Router } = require('express')
const ensureUsersIsAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.put("/", ensureUsersIsAuthenticated, usersController.update)

module.exports = usersRoutes
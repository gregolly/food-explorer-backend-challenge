const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureUsersIsAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', usersController.create)
usersRoutes.put("/", ensureUsersIsAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureUsersIsAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes
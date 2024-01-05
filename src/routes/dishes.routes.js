const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const dishesRoutes = Router()
dishesRoutes.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.put("/:id", dishesController.update)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes
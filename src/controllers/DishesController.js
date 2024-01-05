const DishRepository = require('../repositories/DishRepository')
const DishCreateService = require('../services/DishCreateService')
const DishUpdateService = require('../services/DishUpdateService')
const AppError = require('../utils/AppError')

class DishesController {
    async create(request, response) {
        const { name, category, price, description, ingredients } = request.body

        const dishRepository = new DishRepository()
        const dishCreateService = new DishCreateService(dishRepository)

        const { dish_id } = await dishCreateService.execute({
            name,
            category,
            price,
            description,
            ingredients,
        })

        return response.status(201).json({ id: dish_id })
    }

    async update(request, response) {
        const { name, category, price, description, ingredients } = request.body
        const { id } = request.params

        const dishRepository = new DishRepository()
        const dishUpdateServices  = new DishUpdateService(dishRepository)

        await dishUpdateServices.execute({
            id,
            name,
            category,
            price,
            description,
            ingredients
        })

        return response.json()
    }

    async show(request, response) {
        const { id } = request.params
    
        const dishRepository = new DishRepository()
    
        const dish = await dishRepository.findById(id)
    
        if (!dish) {
          throw new AppError('Prato não encontrado')
        }
    
        const dishIngredients = await dishRepository.getDishIngredients(id)
    
        return response.json({ ...dish, ingredients: dishIngredients })
    }

    async index(request, response) {
        const { search } = request.query
    
        const dishRepository = new DishRepository()
        const dishes = await dishRepository.findDishByNameOrIngredients(search)
    
        return response.json(dishes)
    }

    async delete(request, response) {
        const { id } = request.params
    
        const dishRepository = new DishRepository()
        await dishRepository.remove(id)
    
        return response.json()
    }
}

module.exports = DishesController
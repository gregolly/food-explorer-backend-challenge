const DishRepository = require('../repositories/DishRepository')
const DishCreateService = require('../services/DishCreateService')
const DishUpdateService = require('../services/DishUpdateService')

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
}

module.exports = DishesController
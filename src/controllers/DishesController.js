const DishesRepository = require('../repositories/DishesRepository')
const DishesCreateService = require('../services/DishesCreateService')

class DishesController {
    async create(request, response) {
        const { name, category, price, description, ingredients } = request.body

        const dishesRepository = new DishesRepository()
        const dishesCreateService = new DishesCreateService(dishesRepository)

        const { dish_id } = await dishesCreateService.execute({
            name,
            category,
            price,
            description,
            ingredients,
        })

        return response.status(201).json({ id: dish_id })
    }
}

module.exports = DishesController
const AppError = require("../utils/AppError")

class DishUpdateService {
    constructor(dishRepository) {
        this.dishRepository = dishRepository
    }

    async execute({ id, name, category, price, description, ingredients }) {
        const dish = await this.dishRepository.findById(id)

        if (!dish) {
            throw new AppError('Prato nao encontrado')
        }

        if (!name || !category) {
            throw new AppError('Tanto o nome quanto a categoria são obrigatórios')
        }

        dish.name = name ?? dish.name
        dish.category = category ?? dish.category
        dish.price = price ?? dish.price
        dish.description = description ?? dish.description

        await this.dishRepository.update(dish)

        ingredients = ingredients ?? []

        if (ingredients.length > 0) {
            const oldIngredients = await this.dishRepository
                .getDishIngredients(id)
                .then((data ) => data.map((ingredients) => ingredients.name))

            const remove = oldIngredients.filter((ingredient) => !ingredients.includes(ingredient))

            await this.dishRepository.removeDishIngredients({ dish_id: id, remove })

            const newIngredients = ingredients
                .filter((ingredient) => !oldIngredients.includes(ingredient))
                .map((ingredient) => ({
                    name: ingredient.trim(),
                    dish_id: id
                }))

            if (newIngredients.length !== 0) {
                await this.dishRepository.createDishIngredients(newIngredients)
            }
        } else {
            await this.dishRepository.removeAllDishIngredients(id)
        }
    }
}

module.exports = DishUpdateService
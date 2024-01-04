const knex = require('../database/knex')

class DishesRepository {
    async create({ name, category, price, description }) {
        const [id] = await knex('dishes').insert({
            name,
            category,
            price,
            description
        })

        return id
    }

    async createDishIngredients(ingredients) {
        await knex('ingredients').insert(ingredients);
    }
}

module.exports = DishesRepository
const knex = require('../database/knex')

class DishRepository {
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

    async findById(id) {
        return await knex('dishes').where({ id }).first()
    }

    async update(dish) {
        const update_at = knex.fn.now()

        await knex('dishes')
            .update({ ...dish, update_at })
            .where({ id: dish.id })
    }

    async remove(id) {
        await knex('dishes').delete().where({ id })
    }

    async findDish(search) {
        return await knex
            .select('d.*')
            .from('dishes as d')
            .join('ingredients as i', 'd.id', 'i.dish_id')
            .whereLike('d.name', `%${search}`)
            .orWhereLike('i.name', `%${search}`)
            .groupBy('d.id')
    }

    async createDishIngredients(ingredients) {
        await knex('ingredients').insert(ingredients)
    }

    async getDishIngredients(dish_id) {
        return await knex('ingredients')
        .where({ dish_id })
        .orderBy('name')
    }

    async removeDishIngredients({ dish_id, remove }) {
        await knex('ingredients')
            .delete()
            .where({ dish_id })
            .whereIn('name', remove)
    }

    async removeAllDishIngredients(dish_id) {
        await knex('ingredients').delete().where({ dish_id })
    }
}

module.exports = DishRepository
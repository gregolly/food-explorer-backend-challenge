const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UsersController {
    async create(request, response) {
        const { name, email, password, isAdmin } = request.body
        
        const IsUserCreated = await knex('users').where({ email }).first()

        if (!name || !email || !password) {
            throw new AppError('Informe todos os campos!')
        }

        if (IsUserCreated) {
            throw new AppError("Este e-mail ja esta em uso!")
        }

        if (password.length < 6) {
            throw new AppError('A senha deve ter pelo menos 6 digitos!')
        }

        const hashedPassword = await hash(password, 8)
        
        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        return response.status(201).json()
    }
}

module.exports = UsersController
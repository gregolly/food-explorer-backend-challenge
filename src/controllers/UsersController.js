const knex = require('../database/knex')

const { compare, hash } = require('bcryptjs')
const AppError = require('../utils/AppError')
const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require("../services/UserCreateService")

class UsersController {
    async create(request, response) {
        const { name, email, password, isAdmin } = request.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({ name, email, password, isAdmin })
        
        return response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const user = await knex('users').where({ id: user_id }).first()

        if (!user) {
            throw new AppError('Usuario nao existe')
        }

        if (email !== user.email) {
            const userWithUpdatedEmail = await knex('users').where({ email }).first()
    
            if (userWithUpdatedEmail) {
                throw new AppError('Este email ja esta em uso')
            }
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password) {
            throw new AppError('Voce precisa informar a senha antiga para definir a nova senha')
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new AppError('A senha antiga nao confere!')
            }

            user.password = await hash(password, 8)
        }

        await knex('users').where({ id: user_id }).update({
            name: name || user.name,
            email: email || user.email,
            password: user.password,
        })

        return response.json()
    }
}

module.exports = UsersController
const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password }) {
        const isUserExist = await this.userRepository.findByEmail(email)

        if (isUserExist) {
            throw new AppError('Email ja esta em uso!')
        }

        if (password.length < 6) {
            throw new AppError('A senha deve ter pelo menos 6 digitos!')
        }

        if (!name || !email || !password) {
            throw new AppError('Informe todos os campos!')
        }

        const hashedPassword = await hash(password, 8)

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

        return userCreated
    }
}

module.exports = UserCreateService
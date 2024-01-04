const DiskStorage = require("../providers/DiskStorage")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const avatarFilename = request.file.avatarFilename
        const diskStorage = new DiskStorage()

        const user = await knex('users').where({ id: user_id }).first()

        if (!user) {
            throw new AppError("Somente usuarios logados podem alterar a foto do perfil", 401)
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)

        await knex('users').where({ id: user_id }).update({ avatar: filename })

        const updatedUser = await knex('users').where({ id: user_id }).first()

        return response.status(201).json(updatedUser)
    }
}

module.exports = UserAvatarController
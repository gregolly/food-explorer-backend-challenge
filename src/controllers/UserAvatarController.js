const DiskStorage = require("../providers/DiskStorage")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const avatarFilename = request.file ? request.file.filename : null
        const diskStorage = new DiskStorage()

        console.log(request.file.avatarFilename)

        const user = await knex('users').where({ id: user_id }).first()

        if (!user) {
            throw new AppError("Somente usuarios logados podem alterar a foto do perfil", 401)
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = avatarFilename ? await diskStorage.saveFile(avatarFilename) : "https://placehold.co/600x400"
        user.avatar = filename

        await knex('users')
        .where({ id: user_id })
        .update({ avatar: filename })

        return response.json(user)

    }
}

module.exports = UserAvatarController
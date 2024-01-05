const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

const DishRepository = require('../repositories/DishRepository')

class DishPhotoController {
  async update(request, response) {
    const dish_id = request.params.id
    const photoFilename = request.file.filename

    const diskStorage = new DiskStorage()
    const dishRepository = new DishRepository()

    const dish = await dishRepository.findById(dish_id)

    if (!dish) {
      throw new AppError('Prato não encontrado', 404)
    }

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo)
    }

    const filename = await diskStorage.saveFile(photoFilename)

    dish.photo = filename
    
    await dishRepository.update(dish)

    return response.json(dish)
  }
}

module.exports = DishPhotoController
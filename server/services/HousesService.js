import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";

class HousesService {
  async getAll(query) {
    const houses = await dbContext.Houses.find(query).sort('-bedrooms')
    return houses
  }

  async create(houseData) {
    const newHouse = await dbContext.Houses.create(houseData)
    return newHouse
  }
  async remove(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) throw new BadRequest('no house at id: ' + houseId)
    await house.remove()
    return `deleted ${house.bathrooms} ${house.bedrooms}`
  }
  async update(houseId, houseData) {
    const original = await dbContext.Houses.findById(houseId)
    if (!original) throw new BadRequest('no house at id: ' + houseId)
    original.price = houseData.price ? houseData.price : original.price
    original.bedrooms = houseData.bedrooms ? houseData.bedrooms : original.bedrooms
    original.bathrooms = houseData.bathrooms ? houseData.bathrooms : original.bathrooms
    original.levels = houseData.levels ? houseData.levels : original.levels
    original.imgUrl = houseData.imgUrl ? houseData.imgUrl : original.imgUrl
    original.year = houseData.year ? houseData.year : original.year
    original.description = houseData.description ? houseData.description : original.description
    await original.save()
    return original
  }
}

export const housesService = new HousesService();
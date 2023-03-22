import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class PetsService {
  async getAllPets(query) {
    const pets = await dbContext.Pets.find(query)
    return pets
  }

  async getPetById(petId) {
    const pet = await dbContext.Pets.findById(petId)
    if (!pet) {
      throw new BadRequest('No pet found at this id.')
    }
    return pet
  }

  async createPet(petData) {
    const newPet = await dbContext.Pets.create(petData)
    return newPet
  }

  async editPet(petId, petData) {
    const foundPet = await this.getPetById(petId)
    foundPet.name = petData.name ? petData.name : foundPet.name
    foundPet.type = petData.type ? petData.type : foundPet.type
    foundPet.color = petData.color ? petData.color : foundPet.color
    foundPet.price = petData.price ? petData.price : foundPet.price
    foundPet.description = petData.description ? petData.description : foundPet.description
    foundPet.imgUrl = petData.imgUrl ? petData.imgUrl : foundPet.imgUrl
    await foundPet.save()
    return foundPet
  }

  async deletePet(petId) {
    const pet = await this.getPetById(petId)
    await pet.remove()
    return `Deleted ${pet.name}`
  }
}

export const petsService = new PetsService();
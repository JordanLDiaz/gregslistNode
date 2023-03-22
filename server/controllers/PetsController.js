import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";

export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('', this.getAllPets)
      .get('/:petId', this.getPetById)
      .post('', this.createPet)
      .put('/:petId', this.editPet)
      .delete('/:petId', this.deletePet)
  }

  async getAllPets(req, res, next) {
    try {
      const query = req.query
      const pets = await petsService.getAllPets(query)
      return res.send(pets)
    } catch (error) {
      next(error)
    }
  }

  async getPetById(req, res, next) {
    try {
      const petId = req.params.petId
      const pet = await petsService.getPetById(petId)
      return res.send(pet)
    } catch (error) {
      next(error)
    }
  }

  async createPet(req, res, next) {
    try {
      const petData = req.body
      const newPet = await petsService.createPet(petData)
      return res.send(newPet)
    } catch (error) {
      next(error)
    }
  }

  async editPet(req, res, next) {
    try {
      const petId = req.params.petId
      const petData = req.body
      const editedPet = await petsService.editPet(petId, petData)
      return res.send(editedPet)
    } catch (error) {
      next(error)
    }
  }

  async deletePet(req, res, next) {
    try {
      const petId = req.params.petId
      const pet = await petsService.deletePet(petId)
      return res.send(pet)
    } catch (error) {
      next(error)
    }
  }
}
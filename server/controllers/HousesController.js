import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:houseId', this.getHouseById)
      .post('', this.create)
      .delete('/:houseId', this.remove)
      .put('/:houseId', this.update)
  }
  async getAll(req, res, next) {
    try {
      const query = req.query
      const houses = await housesService.getAll(query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.houseId
      const house = await housesService.getHouseById(houseId)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const house = await housesService.create(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await housesService.remove(req.params.houseId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const updated = await housesService.update(req.params.houseId, req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
}
import { housesService } from "../services/HousesService.js";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAll)
      .get('/:jobId', this.getJobById)
      .post('', this.create)
      .delete('/:jobId', this.remove)
      .put('/:jobId', this.update)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const jobs = await jobsService.getAll(query)
      return res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJobById(req, res, next) {
    try {
      const jobId = req.params.jobId
      const job = await jobsService.getJobById(jobId)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const job = await jobsService.create(req.body)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const message = await jobsService.remove(req.params.jobId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const updated = await jobsService.update(req.params.jobId, req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
}
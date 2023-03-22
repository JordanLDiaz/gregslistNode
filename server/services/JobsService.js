import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class JobsService {
  async getAll(query) {
    const jobs = await dbContext.Jobs.find(query).sort('rate')
    return jobs
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest('No job found at this id.')
    }
    return job
  }

  async create(jobData) {
    const newJob = await dbContext.Jobs.create(jobData)
    return newJob
  }

  async remove(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) throw new BadRequest('no job at id: ' + jobId)
    await job.remove()
    return `deleted ${job.rate} ${job.company}`
  }

  async update(jobId, jobData) {
    const original = await dbContext.Jobs.findById(jobId)
    if (!original) throw new BadRequest('no job at id: ' + jobId)
    original.company = jobData.company ? jobData.company : original.company
    original.jobTitle = jobData.jobTitle ? jobData.jobTitle : original.jobTitle
    original.hours = jobData.hours ? jobData.hours : original.hours
    original.rate = jobData.rate ? jobData.rate : original.rate
    original.description = jobData.description ? jobData.description : original.description
    await original.save()
    return original
  }
}

export const jobsService = new JobsService();
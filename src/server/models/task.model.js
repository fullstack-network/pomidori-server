import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'
import TaskStatus from './TaskStatus'
import uuidv4 from 'uuid/v4';

/**
 * Task Schema
 */
const TaskSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  userId: { type: String, unique: false },
  title: { type: String, unique: false },
  startTime: { type: Date, unique: false, default: Date.now },
  taskTime: { type: Number, unique: false },
  taskStatus: { type: Number, unique: false, default: TaskStatus.STARTED }
}, {
  timestamps: true,
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TaskSchema.methods.isExpired = function() {
  if (this.taskStatus !== TaskStatus.STARTED) {
    return false;
  }

  const now = new Date();
  const diff = now - this.startTime;
  const taskTimeMs = this.taskTime * 1000 * 60;

  return diff >= taskTimeMs;
};
/**
 * Statics
 */
TaskSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Task, APIError>}
   */
  get(id) {
    return this.findById(id).populate('location').populate('criteria').exec().then(user => {
      if (user) {
        return user
      }
      const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
      return Promise.reject(err)
    })
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Task[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().populate('location').populate('criteria').sort({ createdAt: -1 }).skip(skip).limit(limit).exec()
  },
}

/**
 * @typedef Task
 */
export default mongoose.model('Task', TaskSchema)

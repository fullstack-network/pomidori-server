import mongoose from 'mongoose'
import httpStatus from 'http-status'
import app from '../../../index'
import Task from '../../models/task.model'
import TaskStatus from '../../models/taskStatus'

/**
 * root level hooks
 */
afterAll(done => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

describe('## Task APIs', () => {
  it('should show the task as expired', () => {
    const oldDate = new Date() - 1500000;

    const task = new Task({
      startTime: oldDate,
      taskTime: 10,
      taskStatus: TaskStatus.STARTED,
    });

    expect(task.isExpired()).toEqual(true);
  });

  it('should show the task as not expired if the status is not started', () => {
    const oldDate = new Date() - 1500000;

    const task = new Task({
      startTime: oldDate,
      taskTime: 10,
      taskStatus: TaskStatus.INCOMPLETE,
    });

    expect(task.isExpired()).toEqual(false);
  });

  it('should show the task as not expired', () => {
    const oldDate = new Date() - 5;

    const task = new Task({
      startTime: oldDate,
      taskTime: 10,
      taskStatus: TaskStatus.STARTED,
    });

    expect(task.isExpired()).toEqual(false);
  });



});

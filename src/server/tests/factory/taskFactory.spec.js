import mongoose from 'mongoose'
import request from 'supertest'
import httpStatus from 'http-status'
import TaskFactory from '../../models/taskFactory'
import TaskStatus from '../../models/TaskStatus'
import app from '../../../index'

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
  it('should create a new task', () => {
    expect.assertions(1);

    return TaskFactory.create("xxx", 25).then(task => {
      console.log(task);
      expect(task).toBeTruthy()
    }).catch((err) => {
      console.log(err);
    });
  });

  it('should create a new task with the default status', () => {
    expect.assertions(1);

    return TaskFactory.create("xxx", 25).then(task => {
      expect(task.taskStatus).toEqual(TaskStatus.STARTED);
    }).catch((err) => {
      console.log(err);
    });
  });
});


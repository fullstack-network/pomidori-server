import Task from './task.model';

export default class TaskFactory {
  static create(userId, taskTime) {
    console.log(userId)

    let task = new Task({
      userId,
      taskTime,
    })

    return task.save()
  }
}

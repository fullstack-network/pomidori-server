import Task from './task.model';

export default class TaskFactory {
  static create(taskObject) {
    let task = new Task(taskObject);

    return task.save()
  }
}

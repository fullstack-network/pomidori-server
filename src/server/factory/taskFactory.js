import Task from '../models/task.model';

export default class TaskFactory {
  static create(taskObject) {
    let task = new Task(taskObject);
    return task.save()
  }
}

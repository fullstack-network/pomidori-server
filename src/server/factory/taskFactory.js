import Task from '../models/task.model';
import TaskStatus from '../models/TaskStatus';

export default class TaskFactory {
  static create(taskObject) {
    let task = new Task(taskObject);
    return task.save()
  }

  static getAllOpenTasks() {
    return Task.where("taskStatus").eq(TaskStatus.STARTED).exec()
  }

  static processOpenTasks() {
    this.getAllOpenTasks().then((tasks) => {
      tasks.forEach((task) => {
        if (task.isExpired()) {
          task.status = TaskStatus.FINISHED;
          task.save();
        }
      })
    })

  }
}

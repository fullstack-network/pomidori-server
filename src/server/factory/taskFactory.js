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

  static getAllOpenTasksForUser(userId) {
    return Task.where("taskStatus").eq(TaskStatus.STARTED).where("userId").eq(userId).exec()
  }

  static processOpenTasks() {
    let promises = [];

    this.getAllOpenTasks().then((tasks) => {
      tasks.forEach((task) => {
        if (task.isExpired()) {
          task.taskStatus = TaskStatus.FINISHED;
          promises.push(task.save());
        }
      })
    })

    return new Promise((resolve, reject) => {
      Promise.all(promises).then((p) => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

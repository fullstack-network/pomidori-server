import TaskFactory from '../factory/taskFactory'

function create(req, res, next) {

  const taskObject = {
    taskTime: req.body.taskTime,
    title: req.body.title,
    userId: req.userId,
  };

  TaskFactory.create(taskObject).then((result) => {
    res.json(result)
  });
}


function open(req, res, next) {
  TaskFactory.getAllOpenTasksForUser(req.userId).then((tasks) => {
    res.json(tasks);
  });
}


function processOpen(req, res, next) {
  TaskFactory.processOpenTasks().then((result) => {
    res.send("OK")
  })
}


export default { processOpen, create, open }

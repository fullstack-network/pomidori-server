import TaskFactory from '../factory/taskFactory'

function create(req, res, next) {
  TaskFactory.create(req.body).then((result) => {
    res.send("OK")
  });
}

function open(req, res, next) {
  TaskFactory.getAllOpenTasks().then((tasks) => {
    res.json(tasks);
  });
}


function processOpen(req, res, next) {
  TaskFactory.processOpenTasks().then((result) => {
    res.send("OK")
  })
}


export default { processOpen, create, open }

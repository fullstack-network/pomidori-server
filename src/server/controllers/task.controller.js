import TaskFactory from '../factory/taskFactory'
import jwt from 'jsonwebtoken'
import { ExtractJwt } from 'passport-jwt'

function create(req, res, next) {
  const token = ExtractJwt.fromAuthHeader()(req);
  const decoded = jwt.verify(token, 'FAKE_SECRET_CHANGE_ME');

  const taskObject = {
    taskTime: req.body.taskTime,
    title: req.body.title,
    userId: decoded.userId,
  };

  TaskFactory.create(taskObject).then((result) => {
    res.json(result)
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

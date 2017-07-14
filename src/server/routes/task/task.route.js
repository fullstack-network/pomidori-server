import express from 'express'
import validate from 'express-validation'
import taskCtrl from '../../controllers/task.controller'
import verifyToken from '../../middleware/userToken';

const router = express.Router() // eslint-disable-line new-cap

router.use(verifyToken);
router.route('/').post(taskCtrl.create);
router.route('/').get(taskCtrl.open);
router.route('/process_open').post(taskCtrl.processOpen);

export default router

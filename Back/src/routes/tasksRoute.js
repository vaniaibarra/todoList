const expres = require('express');

const router = expres.Router();

const TaskController = require('../controllers/tasksController');
const { validateToken } = require('../middlewares/Auth');

router.get('/', validateToken, TaskController.getTasks);
router.post('/', validateToken, TaskController.postTask);

router.patch('/:id', validateToken, TaskController.alterTask);
router.patch('/:id/toggle', validateToken, TaskController.completeTask);

router.delete('/:id', validateToken, TaskController.deleteTask);

router.get('/categories', validateToken, TaskController.getCategories);
router.get('/priorities', validateToken, TaskController.getPriorities);

router.get('/:id', validateToken, TaskController.getOneTask);


module.exports = router;
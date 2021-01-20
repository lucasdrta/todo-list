import { Router } from 'express';
import { TodosController } from '../controllers/todos';

const routes = Router();
const todoController = new TodosController();

routes.get('/', todoController.list);
routes.post('/', todoController.create);
routes.put('/:id', todoController.update);

export default routes;

import { Router } from 'express';
import { TodosController } from '../controllers/todos';

const routes = Router();
const todoController = new TodosController();

routes.post('/', todoController.create);

export default routes;

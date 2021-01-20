import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';

const routes = Router();

import user from './user';
import todos from './todo';

routes.use('/users', user);
routes.use('/todos', authMiddleware, todos);

export default routes;

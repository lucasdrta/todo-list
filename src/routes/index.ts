import { Router } from 'express';
const routes = Router();

import user from './user';
import todos from './todo';

routes.use('/users', user);
routes.use('/todos', todos);

export default routes;

import { Request, Response, Router } from 'express';
import auth from './auth.routes';
import handleJwtMiddleware from '../middlewares/jwt-handler.middleware';
import { sessionMiddleware } from '../middlewares/session-handler.middleware';

const routes = Router();

routes.use('/auth', auth);
routes.get(
  '/',
  [handleJwtMiddleware, sessionMiddleware],
  (req: Request, res: Response) => {
    res.status(200).send('OK');
  }
);

export default routes;

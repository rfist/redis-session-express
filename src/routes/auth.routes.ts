import { Router } from 'express';
import validateRequestMiddleware from '../middlewares/validate-request-middleware';
import signUpSchema from '../schemas/signUpSchema';
import signUpController from '../controllers/signUpController';
import signInSchema from '../schemas/signInSchema';
import signInController from '../controllers/signInController';

const router = Router();

router.post(
  '/signup',
  validateRequestMiddleware(signUpSchema),
  signUpController
);

router.post(
  '/signin',
  validateRequestMiddleware(signInSchema),
  signInController
);

export default router;

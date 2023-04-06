import { NextFunction, Request, Response } from 'express';
import { SignUpSchema } from 'src/schemas/signUpSchema';
import { SignInSchema } from 'src/schemas/signInSchema';
import { SchemaOf } from 'yup';

function validateRequestMiddleware(
  schema: SchemaOf<SignInSchema | SignUpSchema>
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      req.body = await schema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
}

export default validateRequestMiddleware;

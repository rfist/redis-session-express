import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const handleJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.userId = decoded.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.deviceId = decoded.deviceId;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default handleJwtMiddleware;

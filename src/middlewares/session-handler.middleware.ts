import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../repositories/redis';
import { UserSession } from '../types/userSession';

export const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  const { userId, deviceId } = req as any;
  await redisClient.connect();
  let userSession: UserSession | null = await redisClient.get(userId);

  // If user session does not exist, create a new one with 2-hour TTL
  if (!userSession) {
    userSession = {
      deviceIds: [deviceId],
      lastActivity: Date.now(),
      blocked: false,
    };
    await redisClient.set(userId, JSON.stringify(userSession), { EX: 7200 });
  } else {
    // Add device ID to user's session
    if (!userSession.deviceIds.includes(deviceId)) {
      userSession.deviceIds.push(deviceId);
      await redisClient.set(userId, JSON.stringify(userSession));
    }

    // Check if user is blocked
    if (userSession.blocked) {
      if (userSession.blockedUntil && userSession.blockedUntil > Date.now()) {
        const blockedFor = Math.ceil(
          (userSession.blockedUntil - Date.now()) / 1000 / 60
        );
        return res
          .status(403)
          .json({ message: `User is blocked for ${blockedFor} minute(s)` });
      }
      // Unblock user if blockedUntil timestamp has passed
      userSession.blocked = false;
      userSession.blockedUntil = undefined;
      await redisClient.set(userId, JSON.stringify(userSession));
    }

    // Check if user has been inactive for over an hour
    if (Date.now() - userSession.lastActivity > 60 * 60 * 1000) {
      // Refresh session with 2-hour TTL
      userSession.deviceIds = [deviceId];
      userSession.lastActivity = Date.now();
      userSession.blocked = false;
      userSession.blockedUntil = undefined;
      await redisClient.set(userId, JSON.stringify(userSession), { EX: 7200 });
    } else {
      // Update last activity timestamp
      userSession.lastActivity = Date.now();
      await redisClient.set(userId, JSON.stringify(userSession));
    }
  }

  next();
};

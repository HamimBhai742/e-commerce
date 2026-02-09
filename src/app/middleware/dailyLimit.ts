import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import httpStatus from "http-status";

const dailyLimiter = new RateLimiterRedis({
  storeClient: 'redisClient',
  keyPrefix: 'daily_upload',
  points: 10,        
  duration: 24 * 60 * 60,
});

export const dailyLimiterMiddleware = async (req:Request & { user?: any }, res:Response, next:NextFunction) => {
  try {
    await dailyLimiter.consume(req.user.id)
  } catch (rejRes) {
    res.status(httpStatus.TOO_MANY_REQUESTS).json({ error: 'Daily limit reached. Upgrade for more uploads.' });
  }
};

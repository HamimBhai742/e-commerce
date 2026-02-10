import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AppError } from "../error/custom.error";
import { verifyToken } from "../utils/verifyToken";

const checkAuth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifyUserToken = verifyToken(
        token,
        config.jwt.access_secret as Secret,
      );
      
      if(!verifyUserToken){
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!');
      }
      console.log(verifyUserToken);

      // Check user is exist
      const user = await prisma.user.findUnique({
        where: {
          id: verifyUserToken.id,
        },
      });

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
      }

      if(!user.isVerified){
        throw new AppError(httpStatus.UNAUTHORIZED,'User is not verified')
      }

      if(user.isDeleted){
        throw new AppError(httpStatus.UNAUTHORIZED,'User is deleted')
      }

      if (roles.length && !roles.includes(verifyUserToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, `You are not authorized! Only ${user.role=='admin' ? 'user' : 'admin'} can access this route`);
      }
      
      req.user = verifyUserToken;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkAuth;
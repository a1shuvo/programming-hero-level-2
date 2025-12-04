import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Higher order function return function
const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "You are not allowed" });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      console.log({ decoded });

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          error: "Unauthorized!!!",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;

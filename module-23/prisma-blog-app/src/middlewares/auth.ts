import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user session
      const session = await betterAuth.api.getSession({
        headers: req.headers as Record<string, string>,
      });

      if (!session || !session.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      if (roles.length && !roles.includes(session.user.role as UserRole)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      if (!session.user.emailVerified) {
        return res
          .status(403)
          .json({ success: false, message: "Email not verified" });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name!,
        email: session.user.email!,
        role: session.user.role!,
        emailVerified: session.user.emailVerified!,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
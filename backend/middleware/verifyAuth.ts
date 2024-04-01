import { Request, Response, NextFunction } from "express";

export function createVerifyAuth(sessions: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Check if the request has the Authorization header
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get the supplier ID from the session object
    const supplierId = sessions.get(token);

    // Check if the supplier ID exists in our session object
    if (!supplierId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.locals.supplierId = supplierId;
    next();
  };
}

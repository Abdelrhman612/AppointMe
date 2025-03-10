import { Request, Response, NextFunction } from "express";
export const asyncWrapper = (asyncfunction: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncfunction(req, res, next).catch((err: any) => {
      next(err);
    });
  };
};

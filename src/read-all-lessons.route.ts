import { db } from "./database";
import { Request, Response } from "express";

export function readAllLessons(req: Request, res: Response) {
  res.status(200).json({ lessons: db.readAllLessons() });
}

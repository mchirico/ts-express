import { Request, Response } from "express";

import { USER_SUBSCRIPTIONS } from "./in-memory-db";

export function addPushSubscriber(req: Request, res: Response) {
  const sub = req.body;

  console.log("Received Subscription on the server: ", sub);

  USER_SUBSCRIPTIONS.push(sub);

  res.status(200).json({ message: "Subscription added successfully." });
}

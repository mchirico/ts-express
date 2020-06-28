import { USER_SUBSCRIPTIONS } from "./in-memory-db";
import { Request, Response } from "express";
import fs from "fs";

import webpush from "web-push";
const vapidKeys = JSON.parse(
  fs.readFileSync("./credentials/vapid-key.json").toString()
);

webpush.setVapidDetails(
  "mailto:mchirico@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export function sendNewsletter(req: Request, res: Response): void {
  console.log("Total subscriptions", USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload = {
    notification: {
      title: "Angular News",
      body: "Newsletter Available!",
      icon: "assets/main-page-logo-small-hat.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    },
  };

  Promise.all(
    USER_SUBSCRIPTIONS.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(notificationPayload))
    )
  )
    .then(() =>
      res.status(200).json({ message: "Newsletter sent successfully." })
    )
    .catch((err) => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
}

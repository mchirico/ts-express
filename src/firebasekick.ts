import { App } from "../src/firebase/firebase";
import admin from "firebase-admin";

import WriteResult = admin.firestore.WriteResult;
import DocumentData = admin.firestore.DocumentData;
import * as firebase from "@firebase/testing";
const app = App();
const db = app.firestore();
export const item = db.doc("/pomodoro/mchirico/tasks/0");
import fs from "fs";

import webpush from "web-push";
import { USER_SUBSCRIPTIONS } from "./notification/in-memory-db";
const vapidKeys = JSON.parse(
  fs.readFileSync("./credentials/vapid-key.json").toString()
);

webpush.setVapidDetails(
  "mailto:mchirico@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

class FBK {
  constructor(
    public db: admin.firestore.Firestore | firebase.firestore.Firestore
  ) {}
  set(path: string, data: DocumentData): Promise<WriteResult> | Promise<void> {
    return this.db.doc(path).set(data);
  }
  minutesLeft(path: string) {
    return this.db.doc(path).onSnapshot(
      (docSnapshot: any) => {
        console.log(`Received doc snapshot: ${docSnapshot.data()?.minutes}`);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }
}

export function set(path: string, data: DocumentData): Promise<WriteResult> {
  return db.doc(path).set(data);
}

export function sendMsg(sub: any, data: any): void {
  // sample notification payload
  const notificationPayload = {
    notification: {
      title: "FB News..!!!",
      body: `${data.desc}  minutes: ${data.minutes}`,
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

  //console.log(JSON.stringify(sub));
  setTimeout(() => {
    webpush.sendNotification(sub, JSON.stringify(notificationPayload));
  }, 1000 * 60 * parseInt(data.minutes, 10));
}

// 'pomodoro/mchirico/tasks/0'
export function onSnapshot(path: string): void {
  db.doc(path).onSnapshot(
    (docSnapshot) => {
      console.log(`auth: ${docSnapshot.data()?.auth}`);
      console.log(`endpoint: ${docSnapshot.data()?.endpoint}`);
      console.log(`p256dh: ${docSnapshot.data()?.p256dh}`);
      console.log(`desc: ${docSnapshot.data()?.desc}`);
      console.log(`minutes: ${docSnapshot.data()?.minutes}`);

      if (docSnapshot.data()?.endpoint) {
        const sub = {
          endpoint: docSnapshot.data()?.endpoint,
          expirationTime: null,
          keys: {
            p256dh: docSnapshot.data()?.p256dh,
            auth: docSnapshot.data()?.auth,
          },
        };

        sendMsg(sub, {
          desc: docSnapshot.data()?.desc,
          minutes: docSnapshot.data()?.minutes,
        });

        db.doc(path)
          .delete()
          .catch((e) => console.log(`error:`, e.message))
          .finally(() => {
            console.log(``);
            console.log(` clean up`);
            console.log(``);
          });
      }
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );
}

export { WriteResult, db, FBK };

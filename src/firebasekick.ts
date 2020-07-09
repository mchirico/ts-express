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
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import * as os from "os";
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

  archive(path: string, data: any) {
    const d = new Date();
    data.hostname = os.hostname();
    data.loadavg = os.loadavg();
    data.freemem = os.freemem();
    data.interfaces = os.networkInterfaces();
    try {
      this.db.doc(`pomodoro/u/archive/${path}/${d.toISOString()}`).set(data);
    } catch (error) {
      this.db.doc(`error/firebasekick/archive/${d.toISOString()}`).set({
        error: error.message,
      });
    }
  }

  onSnapshot2(
    path: string,
    key: string,
    value: string,
    changeType: string,
    callback: any
  ) {
    const observer = this.db
      .collection(path)
      .where(key, "==", value)
      .onSnapshot((querySnapshot: any) => {
        querySnapshot.docChanges().forEach((change: any) => {
          if (change.type === changeType) {
            console.log("HIT: ", change.doc.data());
            callback(change.doc.data());
          }

          if (change.type === "added") {
            console.log("Added: ", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
          }
        });
      });
    return observer;
  }

  createSubscription(doc: DocumentData) {
    const sub = {
      endpoint: doc?.endpoint,
      expirationTime: null,
      keys: {
        p256dh: doc?.p256dh,
        auth: doc?.auth,
      },
    };

    return sub;
  }
}

export class ProcessTask {
  constructor(
    public db: admin.firestore.Firestore | firebase.firestore.Firestore
  ) {}

  process(path: string) {
    const fbk = new FBK(this.db);
    return fbk.onSnapshot2(
      path,
      "action",
      "activate",
      "added",
      (doc: DocumentData) => {
        console.log("before: fbk.createSubscription....");
        const sub = fbk.createSubscription(doc);
        console.log("calling sendMsg....");
        sendMsg(sub, {
          desc: doc?.desc,
          minutes: doc?.minutes,
        });

        fbk.archive(path + "/0", doc);

        this.db
          .doc(path + "/0")
          .delete()
          .finally(() => {
            console.log(``);
            console.log(` clean up`);
            console.log(``);
          });
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
      title: `** ${data.desc} **`,
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

export { WriteResult, db, FBK };

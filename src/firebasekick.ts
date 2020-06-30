import { App } from "../src/firebase/firebase";
import admin from "firebase-admin";

import WriteResult = admin.firestore.WriteResult;
import DocumentData = admin.firestore.DocumentData;
import * as firebase from "@firebase/testing";
const app = App();
const db = app.firestore();
export const item = db.doc("/pomodoro/mchirico/tasks/0");

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

export { WriteResult, db, FBK };

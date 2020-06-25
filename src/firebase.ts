import admin from "firebase-admin";
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync("./credentials/firebase-adminsdk.json").toString()
);

let adminApp: admin.app.App;
export function App(): admin.app.App {
  if (!admin.apps.length) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://septapig.firebaseio.com",
    });
    adminApp = app;
    return app;
  }
  return adminApp;
}

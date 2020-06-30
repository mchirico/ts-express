import "mocha";

import * as firebase from "@firebase/testing";
import { FBK, set } from "../src/firebasekick";

// Manual testing:
//   firebase emulators:start
const MY_PROJECT_ID = "septapig";

const myAuth = { uid: "user_abc", email: "abc@gmail.com", admin: true };

function getDBuser(): firebase.firestore.Firestore {
  return firebase
    .initializeTestApp({
      projectId: MY_PROJECT_ID,
      auth: myAuth,
    })
    .firestore();
}

function getDBadmin(): firebase.firestore.Firestore {
  return firebase
    .initializeAdminApp({
      projectId: MY_PROJECT_ID,
    })
    .firestore();
}

describe("FirebaseKick ...", function () {
  afterEach(async function () {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  // TODO: You need the emulator for this test
  //   firebase emulators:start --project septapig
  it("Test snapshot minutes", async function () {
    const path = "/items/1";
    const db = getDBadmin();
    const fbk = new FBK(db);
    await fbk.set(path, { data: "works", fb: "yes...fbk", minutes: 20 });
    await fbk.minutesLeft(path);

    const testQuery = db.doc(path);
    await firebase.assertSucceeds(testQuery.get());
  });

  it("Test snapshot listener0", async function () {
    const path = "/items/1";
    const db = getDBadmin();
    const fbk = new FBK(db);
    await fbk.set(path, { data: "works", fb: "yes...fbk" });

    const testQuery = db.doc(path);
    await firebase.assertSucceeds(testQuery.get());
  });

  it("Test snapshot listener1", async function () {
    const path = "/items/1";
    const db = getDBuser();
    const testQuery = db.doc(path);
    await firebase.assertSucceeds(testQuery.get());
  });

  // TODO: You need the emulator for this test
  it("Test snapshot listener2", async function () {
    const path = "/items/1";

    const db = getDBadmin();

    await db.doc(path).set({ junk: "here 1 2 3" });
    await set(path, { data: "here " }).catch((e) => {
      console.log(`error: ${e.message}`);
    });
  });
});

import "mocha";
import { expect } from "chai";
import { set, db } from "../src/firebasekick";
import * as sinon from "sinon";
import * as firebase from "@firebase/testing";
import admin from "firebase-admin";
import DocumentReference = admin.firestore.DocumentReference;
import DocumentData = admin.firestore.DocumentData;

// stub(obj, 'meth').callsFake(fn)
const MY_PROJECT_ID = "septapig";

function getDBadmin(): firebase.firestore.Firestore {
  return firebase
    .initializeAdminApp({
      projectId: MY_PROJECT_ID,
    })
    .firestore();
}

function s(path: string): DocumentReference<DocumentData> | any {
  const mdb = getDBadmin();
  console.log("path:", path);
  // return mdb.doc("zz/b");
  return mdb.doc(path);
}

describe.skip("mock ...", function () {
  beforeEach(async function () {
    sinon.stub(db, "doc").callsFake(s);
  });

  afterEach(function () {
    // Cancel snapshot listener
  });

  it("Test snapshot listener", async function () {
    //const path = "test/express/task/0";
    const path = "test/0";

    const data = { a: "one", time: new Date(), minutes: 35 };
    await set(path, data);

    const testQuery = db.doc(path);
    await firebase.assertSucceeds(testQuery.get());
  });
});

import "mocha";
import { expect } from "chai";
import { App } from "../src/firebase";

describe("Firebase ...", function () {
  it("Test write to firebase", async function () {
    let status = false;
    const app = App();
    const db = app.firestore();
    await db
      .collection("tsExample")
      .doc("y")
      .set({
        first: "What now okay done...",
        last: "Lovelace",
        born: 1815,
        msg: "Hello world",
      })
      .then((r) => {
        console.log("Document written with ID: ", r);
        expect(r).to.exist;
        status = true;
      })
      .catch(function (error: Error) {
        console.error("Error adding document: ", error);
      });

    expect(status).to.be.true;
  });

  it("Test called twice", async function () {
    const app = App();
    const db1 = app.firestore();
    const db = app.firestore();
    expect(db1).to.equal(db);
    await db
      .collection("tsExample")
      .doc("y")
      .set({
        first: "What now okay done...",
        last: "Lovelace",
        born: 1815,
        msg: "Hello world",
      })
      .then((r) => {
        console.log("Document written with ID: ", r);
        expect(r).to.exist;
      })
      .catch(function (error: Error) {
        console.error("Error adding document: ", error);
      });
  });
});

import "mocha";
import { expect } from "chai";
import { App } from "../src/firebase";

describe("Firebase ...", function () {
  it("Test write to firebase", async function () {
    const app = App();
    const db = app.firestore();
    db.collection("tsExample")
      .doc("y")
      .set({
        first: "What now okay done...",
        last: "Lovelace",
        born: 1815,
        msg: "Hello world",
      })
      .then((r) => {
        console.log("Document written with ID: ", r);
      })
      .catch(function (error: Error) {
        console.error("Error adding document: ", error);
      });

    expect("test").to.contain("test");
  });
});

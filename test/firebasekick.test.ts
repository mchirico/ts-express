import "mocha";
import { expect } from "chai";
import { set, db } from "../src/firebasekick";

describe.skip("FirebaseKick ...", function () {
  let obs: { (): void; (): void };
  beforeEach(async function () {
    const path = "/test/express/task/0";
    await db.doc(path).delete();
  });

  afterEach(function () {
    // Cancel snapshot listener
    obs();
  });

  it("Test snapshot listener", function (done) {
    const path = "/test/express/task/0";
    const expected = [35, 31];
    const actual: number[] = [];
    let count = 0;

    const data = { a: "one", time: new Date(), minutes: 35 };
    set(path, data);

    obs = db.doc(path).onSnapshot(
      (docSnapshot) => {
        console.log(`Received doc snapshot: ${docSnapshot.data()?.minutes}`);
        console.log(`count: ${count}`);

        actual.push(docSnapshot.data()?.minutes);
        count += 1;
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    const data2 = { a: "one", time: new Date(), minutes: 31 };
    set(path, data2);

    setTimeout(() => {
      expect(actual).to.include(expected[0]);
      expect(actual).to.include(expected[1]);
      expect(count).to.be.gte(2);
      done();
    }, 1500);
  });
});

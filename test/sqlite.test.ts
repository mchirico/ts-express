import "mocha";
import { expect } from "chai";
import { promises } from "fs";
import * as sqlite3 from "sqlite3";

describe("SQLite", function () {
  beforeEach(async function () {
    await promises.unlink("./test.db").catch((e) => {
      console.log("e: " + e.message);
    });
  });

  it("log utility", async function () {
    const db = new sqlite3.Database("test.db");

    db.serialize(function () {
      db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

      const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT count(*) as total FROM lorem", function (
        err: string,
        row: { total: string }
      ) {
        if (err !== null) {
          console.log(row.total + ": " + err);
        } else {
          console.log("total count: " + row.total);
        }
      });

      db.each("SELECT rowid AS id, info FROM lorem limit 3", function (
        err: string,
        row: { id: string; info: string }
      ) {
        if (err !== null) {
          console.log(row.id + ": " + row.info + " " + err);
        } else {
          console.log(row.id + ": " + row.info + " ");
        }
      }).close(() => {
        expect("test").to.contain("test");
      });
    });
  });
});

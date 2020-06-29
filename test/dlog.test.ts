import "mocha";
import { expect } from "chai";
import { promises } from "fs";
import { Log } from "../src/dlog";

describe("Index ...", function () {
  beforeEach(async function () {
    await promises.unlink("./dlogger.txt").catch((e) => {
      console.log("e: " + e.message);
    });
  });

  afterEach(async function () {
    await promises.unlink("./dlogger.txt").catch((e) => {
      console.log("e: " + e.message);
    });
  });

  it("log utility", async function () {
    const log = new Log();
    await log.log("test");
    const result = await log.read();
    expect(result).to.contain("test");
  });

  it("change file", async function () {
    let status = false;
    const log = new Log();
    log.file = "./junkfile";
    await log.log("test");
    const result = await log.read();
    expect(result).to.contain("test");
    await log.reset();
    await log.read().catch((e) => {
      expect(e.message).to.contain("no such file or directory");
      status = true;
    });
    expect(status).to.be.true;
  });
});

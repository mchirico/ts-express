import "mocha";
import { expect } from "chai";

import { GitHubApiClient } from "../src/githubapi";

describe("Github Api ...", function () {
  it.skip("GitHub Api", function (done) {
    const g = new GitHubApiClient();
    g.fetchUser("mchirico").then((user) => {
      expect(user.name).to.equal("Mike Chirico");
      expect(user.location).to.equal("USA, Elkins Park, Pennsylvania");
      done();
    });
  });

  it.skip("GitHub Api Not Found", function (done) {
    const g = new GitHubApiClient();
    g.fetchUser("bubbaGump/bad/response").catch((e) => {
      expect(e.message).to.equal("Not Found");
      done();
    });
  });
});

import "mocha";
import { expect } from "chai";

import { GitHubApiClient } from "../src/githubapi";

describe("Github Api ...", function() {
  it("GitHub Api", function(done) {
    const g = new GitHubApiClient();
    g.fetchUser("mchirico").then(user => {
      expect(user.name).to.equal("Mike Chirico");
      expect(user.location).to.equal("USA, Elkins Park, Pennsylvania");
      done();
    });
  });
});

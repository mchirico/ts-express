import { GitHubApiClient } from '../src/index'

describe('GitHubApiClient', () => {
  beforeEach(async () => {

  })

  test('check for Mike Chirico', async (done) => {
    const g = new GitHubApiClient()

    g.fetchUser('mchirico')
      .then((user) => {
        console.log(user.name)
        done(expect(user.name).toContain('Mike Chirico'))
      })
      .catch(err => {
        console.error(`Error: ${err.message}`)
      })
  })

  afterEach(() => {

  })
})

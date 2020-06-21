import { GitHubApiClient } from '../src/index'

describe('GitHubApiClient', () => {
  beforeEach(async (done) => {
    done()
  })

  test('check for Mike Chirico', async (done) => {
    const g = new GitHubApiClient()

    g.fetchUser('mchirico')
      .then((user) => {
        console.log(user.name)
        expect(user.name).toContain('Mike Chirico')
        done()
      })
      .catch(err => {
        console.error(`Error: ${err.message}`)
      })
  })

  afterEach(() => {

  })
})

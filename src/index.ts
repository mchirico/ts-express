import fetch from 'node-fetch'

class GitHubApiClient {
  async fetchUser (handle:string) {
    const url = `https://api.github.com/users/${handle}`
    const response = await fetch(url)
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body
  }
}

const g = new GitHubApiClient()
g.fetchUser('mchirico')
  .then((user) => {
    console.log(user.name)
    console.log(user.location)
  })
  .catch(err => {
    console.error(`Error: ${err.message}`)
  })

export { GitHubApiClient }

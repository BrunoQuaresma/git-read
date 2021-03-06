const fs = require('fs-extra')
const defaultRootPath = `${__dirname}/.git-read`
const simpleGit = require('simple-git')

class Reader {
  constructor(
    repoPath,
    rootPath = defaultRootPath,
    client = simpleGit
  ) {
    this.repoPath = repoPath
    this.rootPath = rootPath
    this.client = client
    this.repoName = null
  }

  load() {
    this.checkRootPath()
    this.setupClient()
    this.setRepoName()

    return this.cloneRepo()
  }

  checkRootPath() {
    fs.ensureDirSync(this.rootPath)
  }

  setupClient() {
    this.client = this.client(this.rootPath)
  }

  setRepoName() {
    this.repoName = this
                      .repoPath
                      .split('/')
                      .slice(-1)[0]
                      .replace('.git', '')
  }

  cloneRepo() {
    return new Promise((resolve, reject) => {
      if (!this.hasRepoBeenCloned()) {
        return this
                .client
                .clone(this.repoPath, null, (err) => {
                  err ? reject(err) : resolve()
                })
      }

      resolve()
    })
  }

  hasRepoBeenCloned() {
    return fs.pathExistsSync(this.getLocalRepoPath())
  }

  getLocalRepoPath() {
    return `${this.rootPath}/${this.repoName}`
  }

  read(filePath) {
    return fs.readFileSync(`${this.getLocalRepoPath()}/${filePath}`, 'utf8')
  }
}

module.exports = Reader
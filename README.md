# git-read
Read files from git

## Usage
```javascript
const GitReader = require('git-read')
const gitReader = new GitReader('https://github.com/user/repo.git')

gitReader.load().then(() => {
  console.log(gitReader.read('config/user.json'))
})

// output:
// { "name": "Foo", "last_name": "Bar" }
```

| API | What it does |
|-----|--------------|
|constructor(repoPath)|Builds a consumer for the specified repository|
|read(filePath)|Returns the content of the repo file encoded by utf8|
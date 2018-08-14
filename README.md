# git-consume
A content consumer for git

## Usage
```javascript
const GitConsumer = require('git-consumer')
const gitConsumer = new GitConsumer('https://github.com/user/repo.git')

gitConsumer.load().then(() => {
  console.log(gitConsumer.get('config/user.json'))
})

## output:
## { "name": "Foo", "last_name": "Bar" }
```

| API | What it does |
|-----|--------------|
|constructor(repoPath)|Builds a consumer for the specified repository|
|get(filePath)|Returns the content of the repo file encoded by utf8|
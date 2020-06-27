const hypertrie = require('hypertrie')
const db = hypertrie('./trie.db', {valueEncoding: 'json'})

console.log(db.version)
console.log(db.discoveryKey)

db.put('2399393', {'type': 'complex'}, function () {
  db.get('2399393', console.log)
})

db.list( { ifAvailable: true }, (err, content) => {
  console.log('contentlists')
  console.log(content)
})

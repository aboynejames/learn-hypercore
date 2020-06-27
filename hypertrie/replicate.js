const hypertrie = require('hypertrie')
var db1 = hypertrie('./datatype.db', {valueEncoding: 'json'})
var db2 = null // hypertrie('./datatype2.db', {valueEncoding: 'json'})

console.log(db1.version)
console.log(db1.discoveryKey)

/*
db1.list( { ifAvailable: true }, (err, content) => {
  console.log('contentlists')
  console.log(content)
})
*/

db1.ready(() => {
  console.log('db1 ready to do replication?')
  db1.put('112233445', {'type': 'beats per minue'}, function () {
    // db1.get('2399393', console.log)
  })
  // console.log(db1)
  db2 = hypertrie('./datatype2.db', db1.key, {valueEncoding: 'json'})
    db1.put('a', 'b', () => {
      db2.get('a', (err, node) => {
        console.log('db2 data yesyeysys')
        //console.log(node)
      })
    })
    replicateMaster(db1, db2, { live: true })
  // var stream = db1.replicate(true)
  // var stream2 = db2.replicate(true)

  // let repJam = replicateMaster(stream, stream2, { live: true })
  // console.log(repJam)
  db2.list( { ifAvailable: true }, (err, content) => {
    console.log('contentlists2')
    console.log(content)
  })
})

function replicateMaster (db1, db2, opts) {
  console.log('function called')
  console.log(db1)
  console.log(db2)
  const stream = db1.replicate(true, opts)
  return stream.pipe(db2.replicate(false, opts)).pipe(stream)
}

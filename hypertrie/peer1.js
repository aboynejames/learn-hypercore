const hypertrie = require('hypertrie')
const hyperswarm = require('hyperswarm')
var pump = require('pump')

var db1 = hypertrie('./datapeer1.db', {valueEncoding: 'json'})
console.log(db1.version)
console.log(db1.discoveryKey)

var swarm = hyperswarm()

db1.ready(() => {
  console.log('db1 ready to do replication?')
  console.log(db1.key)
  console.log(db1.key.toString('hex'))

  swarm.join(db1.key, {
    lookup: true, // find & connect to peers
    announce: true // optional- announce yourself as a connection target
  })

  db1.put('22245454545', {'type': 'beats per minue'}, function () {
    // db1.get('2399393', console.log)
  })

  var connectCount = 0
  swarm.on('connection', function (socket, details) {
    connectCount++
    console.log(connectCount)
    // `details` is a simple object that describes the peer we connected to
    // console.log('found a peer', details)
    // `socket` is a duplex stream that you read from and write to it, e.g.,
    console.log('swarm connect peer1')
    pump(socket, db1.replicate(true, { live: true }), socket)
  })
})


db1.list( { ifAvailable: true }, (err, content) => {
  console.log('contentlists')
  console.log(content)
})

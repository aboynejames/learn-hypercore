const hypertrie = require('hypertrie')
const hyperswarm = require('hyperswarm')
var pump = require('pump')

// need to use pub key in buffer from, need to explicity share ptop
let peer1Key = Buffer.from('7349cbeffca7630f74379e27976165ae502335b6431a2207537f2b3aa032967a', "hex")
console.log(peer1Key)
var db2 = hypertrie('./datapeer2.db', peer1Key, {valueEncoding: 'json'})
//console.log(db2.version)
// console.log(db2.discoveryKey)

var swarm = hyperswarm()

  swarm.join(peer1Key, {
    lookup: true, // find & connect to peers
    announce: true // optional- announce yourself as a connection target
  })

db2.ready(() => {
  console.log('db2 ready to do replication?')
  var connectCount = 0
  swarm.on('connection', function (socket, details) {
    connectCount++
    console.log(connectCount)
    // `details` is a simple object that describes the peer we connected to
    // console.log('found a peer', details)
    // `socket` is a duplex stream that you read from and write to it, e.g.,
    console.log('swarm connect peer2')
    // socket.write('three jioned')
    pump(socket, db2.replicate(false, { live: true }), socket)
  })
})

db2.list( { ifAvailable: true }, (err, content) => {
  console.log('contentlists')
  console.log(content)
})

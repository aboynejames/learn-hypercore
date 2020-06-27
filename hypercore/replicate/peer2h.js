var hypercore = require('hypercore')
const hyperswarm = require('hyperswarm')
var pump = require('pump')

// need to use pub key in buffer from, need to explicity share ptop
let peer1Key = Buffer.from('183e1dfab46b4ca86a83fb7e4d26f7aa1d45fa9ec85810ba062b926db4cd3bcb', "hex")
console.log(peer1Key)
// where to store replication
var feed2 = hypercore('./feed2-clone', peer1Key, {
  valueEncoding: 'json'
})

var swarm = hyperswarm()

  swarm.join(peer1Key, {
    lookup: true, // find & connect to peers
    announce: true // optional- announce yourself as a connection target
  })


feed2.ready(function () {
  console.log('fee1d keys')
  console.log(feed2.discoveryKey.toString('hex'))
  console.log(feed2.key.toString('hex'))
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
    pump(socket, feed2.replicate(false, { live: true }), socket)
  })
})

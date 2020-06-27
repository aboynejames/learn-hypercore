var hypercore = require('hypercore')
const hyperswarm = require('hyperswarm')
var pump = require('pump')

// Save this file as single-chat.js
var feed1 = hypercore('./feed1-source', {
  valueEncoding: 'json'
})

var swarm = hyperswarm()

feed1.ready(function () {
  console.log('fee1d keys')
  console.log(feed1.discoveryKey.toString('hex'))
  console.log(feed1.key.toString('hex'))
  console.log(feed1.key)

  swarm.join(feed1.key, {
    lookup: true, // find & connect to peers
    announce: true // optional- announce yourself as a connection target
  })

  feed1.append({
    type: 'chat-message',
    nickname: 'replicator AI33',
    text: 'wpain333',
    timestamp: '2018-11-05T14:27:000Z' // new Date().toISOString()
  }, function (err, seq) {
    if (err) throw err
      console.log('Data was appended as entry #' + seq)
      // replicateMaster(feed1, feed2, { live: true }, { live: true })
  })

  var connectCount = 0
  swarm.on('connection', function (socket, details) {
    connectCount++
    console.log(connectCount)
    // `details` is a simple object that describes the peer we connected to
    // console.log('found a peer', details)
    // `socket` is a duplex stream that you read from and write to it, e.g.,
    console.log('swarm connect peer1')
    pump(socket, feed1.replicate(true, { live: true }), socket)
  })
})

// command line interface interaction and save messages
function saveRefcontract (data) {
  // var key = String(process.stdin.read());
  console.log('save ref contract')
  console.log(data.toString())
  feed1.append({
    type: 'peer1 message',
    nickname: 'sharing is good',
    text: data.toString().trim(),
    timestamp: new Date().toISOString()
  })
}

var input = process.stdin
input.on('data', (data) => {
  console.log('command line in', data.toString())
  saveRefcontract(data)
})

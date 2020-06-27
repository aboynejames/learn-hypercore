const hyperswarm = require('hyperswarm')
const hypercore = require('hypercore')
var pump = require('pump')

/*
public key: 8394d171e48cac34c1371722340bcfe537d35bedcfdb1dd8eab4ccb4615b5a05
discovery key: f3c86bf0b73b3b6fb9160c8e616a80a14d9304e1c1bf7ff8a2089862b191aaf2
secret key: 1e3b116be3e0939c2f39bcb85129e9e678ec99975acee9889f684aba71d88d718394d171e48cac34c1371722340bcfe537d35bedcfdb1dd8eab4ccb4615b5a05

*/

// Save this file as single-chat.js
var feed = hypercore('./single-chat-feed', {valueEncoding: 'json'})

var swarm = hyperswarm()

feed.ready(() => {
  console.log('public key:', feed.key)
  console.log('public key:', feed.key.toString('hex'))
  console.log('discovery key:', feed.discoveryKey)
  console.log('discovery key:', feed.discoveryKey.toString('hex'))
  console.log('secret key:', feed.secretKey.toString('hex'))
  // we use the discovery as the topic
  swarm.join(feed.key, { lookup: true, announce: true })

  feed.append({
    type: 'peer message gensisisw222',
    nickname: 'sync timefor peers222',
    text: 'more data22',
    timestamp: new Date().toISOString()
  })

  var connectionCount = 0
  swarm.on('connection', function (socket, details) {
    // console.log('(New peer connected!)')
    connectionCount++
    // console.log(connectionCount)
    // We use the pump module instead of stream.pipe(otherStream)
    // as it does stream error handling, so we do not have to do that
    // manually.
    // process.stdin.pipe(socket)
    // See below for more detail on how this work.
    // console.log('client peer 1')
    pump(socket, feed.replicate(true, { live: true }), socket)
  })
})

// command line interface interaction and save messages
function saveRefcontract (data) {
  // var key = String(process.stdin.read());
  console.log('save ref contract')
  console.log(data.toString())
  feed.append({
    type: 'peer message',
    nickname: 'dogosforever',
    text: data.toString().trim(),
    timestamp: new Date().toISOString()
  })
}

var input = process.stdin
input.on('data', (data) => {
  console.log('command line in', data.toString())
  saveRefcontract(data)
})

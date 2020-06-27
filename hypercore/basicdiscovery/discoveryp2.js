var hypercore = require('hypercore')
var hyperswarm = require('hyperswarm')


  function saveRefcontract (data) {
    // var key = String(process.stdin.read());
    console.log('save ref contract TWO')
    console.log(data.toString())
    feed.append({
      type: 'peer message',
      nickname: 'cat-lover',
      text: data.toString().trim(),
      timestamp: new Date().toISOString()
    })
  }

  function readRefContract () {
    feed.createReadStream({ live: true })
      .on('data', function (data) {
        console.log('reading from store1')
      console.log(data)
    })
  }

var input = process.stdin
input.on('data', (data) => {
  console.log('command line in', data.toString())
  saveRefcontract(data)
})

// location of folder
var feed = hypercore('./twoway2-chat-feed', {
  valueEncoding: 'json'
})

var swarm = hyperswarm()

var topic = Buffer.from('a49766a23610999dc5dfe05bc37cd98a9911d4b46bd25fc2cd037b9669a1e214', 'hex')

swarm.join(topic, {
  lookup: true, // find & connect to peers
  announce: true // optional- announce yourself as a connection target
})

let connectCount = 0

// this event is fired every time you find and connect to a new peer also on the same key
swarm.on('connection', function (socket, details) {
  connectCount++
  console.log(connectCount)
  // `details` is a simple object that describes the peer we connected to
  // console.log('found a peer', details)
  // `socket` is a duplex stream that you read from and write to it, e.g.,
  var st = socket // process.stdin.pipe(socket)  // .pipe(process.stdout)

  st.on('data', (data) => {
    saveRefcontract(data)
  })

  st.on('finish', (data) => {
    console.log('close please read me')
  })
})

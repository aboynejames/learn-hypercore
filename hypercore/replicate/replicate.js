var hypercore = require('hypercore')

// Save this file as single-chat.js
var feed1 = hypercore('./feed1', {
  valueEncoding: 'json'
})


feed1.ready(function () {
  console.log('fee1d keys')
  console.log(feed1.discoveryKey.toString('hex'))
  console.log(feed1.key.toString('hex'))

  feed1.append({
    type: 'chat-message',
    nickname: 'replicator AI33',
    text: 'wpain333',
    timestamp: '2018-11-05T14:27:000Z' // new Date().toISOString()
  }, function (err, seq) {
    if (err) throw err
      console.log('Data was appended as entry #' + seq)
      var feed2 = hypercore('./feed2', feed1.key, {
        valueEncoding: 'json'
      })
      // feed2.get(0, console.log())
      replicateMaster(feed1, feed2, { live: true }, { live: true })
    })
})


function replicateMaster (a, b, opts, bOpts) {
  var stream = a.replicate(false, opts)
  return stream.pipe(b.replicate(true, bOpts || opts)).pipe(stream)
}

var hypercore = require('hypercore')

// location of folder
var feed = hypercore('./single-chat-feed', {
  valueEncoding: 'json'
})

feed.get(0, console.log)
feed.get(1, console.log)

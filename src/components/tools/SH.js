
let UUID = require('uuid')
var WebSocketClient = require('websocket').client;
console.error(require('websocket'))
var client = {
  on:function(a, b){},
  connect:function(){}
}// new WebSocketClient()

client.on('connectFailed', err => {
  stat = false
  instance = false
})
var conn = null
client.on('connect', connection => {
  stat = true
  conn = connection
  console.log('connection to server')
  startHB(connection)
  login(connection)

  connection.on('error', err => {
    stat = false
    connection.close()
    console.log('error to server')
  })
  connection.on('close', _ => {
    stat = false
    instance = false
    console.log('error to server')
  })
  connection.on('message', message => {
    console.log('receive a message from server')
    console.log(message)
    if(message.type === 'utf8') {
      let data = message.utf8Data
      try {
        data = JSON.parse(data)
        if(callback) {
          callback(data)
        }
      } catch(e) {
        console.error('not json data')
        /*
        target.$message({
          message: '数据错误',
          type: 'success'
        });
        */
      }
    } else {
      console.error('not utf8 data')
    }
  })
})

var callback = null
function bind(call) {
  callback = call
}
function unbind() {
  callback = null
}
//
function start() {
  checkStat()
}

const ok_snotify = JSON.stringify({type:'ok_snotify', data:'ok'})
//
function ok_notify() {
  if(stat) {
    conn.sendUTF(ok_snotify)
  }
}

let hbTask = null
function startHB(connection) {
  if(hbTask!==null) {
    clearInterval(hbTask)
    hbTask = null
  }
  hbTask = setInterval(_ => {
    if (!stat) {
      clearInterval(hbTask)
      hbTask = null
      return
    }
    connection.sendUTF(hbdata)
  }, 60000)
}
var stat = false
var instance = false
function checkStat() {
  if(!stat && !instance) {
    instance = true
    client.connect('wss://aaa.bigfacewo.com/dwws', 'echo-protocol')
  }
  setInterval(_ => {
    if(!stat && !instance) {
      instance = true
      client.connect('wss://aaa.bigfacewo.com/dwws', 'echo-protocol')
    }
  }, 10000)
}
function login(connection) {
  connection.sendUTF(JSON.stringify({type:'slogin', id: UUID.v1()}))
}

export default {
  bind: bind,
  unbind: unbind,
  start: start,
  ok_notify: ok_notify
}

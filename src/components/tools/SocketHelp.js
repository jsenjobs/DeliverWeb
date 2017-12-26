
let UUID = require('uuid')
let apis = require('../../apis.json')
var W3CWebSocket = require('websocket').w3cwebsocket;
var client = null
checkStat()

function setupClient() {
  client.onerror = function(err) {
    stat = false
    console.log('error to server')
  }
  client.onopen = function() {
    stat = true
    console.log('connection to server')
    startHB()
    login()
  }
  client.onclose = function() {
    stat = false
    instance = false
    console.log('connection closed')
  }
  client.onmessage = function(message) {
      console.log('receive a message from server')
    if (typeof message.data === 'string') {
      let data = message.data
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
  }
}

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
  if(stat && client.readyState === client.OPEN) {
    client.send(ok_snotify)
  }
}

const hbdata = JSON.stringify({ type: 'ping', data: 'hb' })
let hbTask = null
function startHB() {
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
    client.send(hbdata)
  }, 60000)
}
var stat = false
var instance = false
function checkStat() {
  if(!stat && !instance) {
    instance = true
    client = new W3CWebSocket(apis.NotifySocket, 'echo-protocol')
    setupClient()
  }
  setInterval(_ => {
    if(!stat && !instance) {
      instance = true
      client = new W3CWebSocket(apis.NotifySocket, 'echo-protocol')
      setupClient()
    }
  }, 10000)
}
function login() {
  client.send(JSON.stringify({type:'slogin', id: UUID.v1()}))
}

export default {
  bind: bind,
  unbind: unbind,
  start: start,
  ok_notify: ok_notify
}

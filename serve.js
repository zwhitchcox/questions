const cp = require('child_process')
const gaze = require('gaze')

let rollup_process = cp.spawn('yarn', ['rollup', '-w', '-c'], {stdio: 'inherit'})
gaze(['build/server.js'], (err, watcher) => {
  watcher.on('all', start_server)
})
let server;

function start_server() {
  kill_server()
  server = cp.spawn('node', ['build/server'], {stdio: 'inherit'})
}

process.on('exit', kill_server)

function kill_server() {
  if(server) server.kill('SIGTERM')
}

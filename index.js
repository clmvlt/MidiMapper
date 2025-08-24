const { hideConsole } = require('node-hide-console-window');
hideConsole();

const express = require('express')
const app = express();
const fs = require('fs');

app.get('/', function (req, res) {
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
})

app.listen(3000)

const actions = {
  PRESS: "127",
  LEAVE: "0"
}

const soundBoard = require('./binds.json');

const midi = require('midi');
const robot = require('robotjs');

const input = new midi.Input();
const output = new midi.Output();

input.getPortCount();
input.getPortName(0);

input.on('message', (deltaTime, message) => {
  let msg = message[1].toString().split('');
  let row = msg[0];
  let col = msg[1];

  if (message[0] == "144") { // Touches Principales
    if (row + col == '18') {
      process.exit();
    }
    let action = message[2].toString();
    if (action == actions.PRESS) {
      if (soundBoard[row + col] != null) {
        robot.keyToggle('control', 'down');
        robot.keyTap(soundBoard[row + col]);
        robot.keyToggle('control', 'up');
      }
    }

  } else if (message[0] == "176") { // Touches Du dessus

  }

});

input.ignoreTypes(false, false, false);
input.openPort(0);

/* setTimeout(function() {
  input.closePort();
}, 100000); */

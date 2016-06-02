import tree from 'state/StateTree';
import $ from "jquery";
import {addChatToUi} from 'actions/ChatActions';

var socket = require('socket.io-client')('http://localhost:5050');
const authentication = tree.select(['authentication']);

// listeners

  socket.on('hi', function(msg){
    console.log(msg, 'dfadf')
  });

  socket.on('updatechat', function(msg){
    console.log(msg, 'join toom')
  });

  socket.on('message', function(msg){
    console.log(msg, 'message')
    addChatToUi(msg);
  });

// end listeners


export async function addChat(chat) {
  socket.emit('message', chat);
}

export async function joinRoom(room) {
  socket.emit('joinRoom', room);
}
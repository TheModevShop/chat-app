import tree from '../state/StateTree';
import {addChatToUi} from './ChatActions';
import _ from 'lodash';
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket;
const authentication = tree.select(['authentication']);
const userDetailsCursor = tree.select(['user']);
let socketConnection = false;


userDetailsCursor.on('update', function(e) {
  var eventData = e.data;
  if (_.get(eventData, 'currentData.details.id') && !_.get(eventData, 'previousData.details.id')) {
    intitChat(_.get(eventData, 'currentData.details.id'))
  }
});

export async function intitChat(id) {
   socket = io('ws://localhost:8888', {query: `id=${id}`, jsonp: false, transports: ['websocket']});
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
}


export async function addChat(chat) {
  socket.emit('message', chat);
}

export async function joinRoom(room) {
  socket.emit('joinRoom', room);
}
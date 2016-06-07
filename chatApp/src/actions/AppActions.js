import tree from '../state/StateTree';
import {addChatToUi} from './ChatActions';
// window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/socket.io';

const socket = io('http://localhost:5050', {jsonp: false});
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
import tree from 'state/StateTree';
import {editMeApi, getUser} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/AuthenticationActions';
import * as api from 'api/chatApi';
import * as socket from 'actions/AppActions';

const chatCursor = tree.select(['chat']);
const conversationCursor = tree.select(['conversation']);
const savedMessagesCursor = tree.select(['messages']);
const messagesCursor = tree.select(['chat', 'activeChat', 'chats']);

export async function openChat(user) {
  chatCursor.set(['activeChat', 'user'], user);
}

export async function addChat(chat) {
  socket.addChat(chat);
}

export async function addChatToUi(msg) {
  messagesCursor.push(msg);
}

export function clearChat() {
  conversationCursor.set({stale: true});
  savedMessagesCursor.set({stale: true});
  chatCursor.set({
    activeChat: {
      user: null,
      chats: []
    }
  });
}

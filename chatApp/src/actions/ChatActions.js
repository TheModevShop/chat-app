import tree from '../state/StateTree';
import {editMeApi, getUser} from '../api/userApi';
import _ from 'lodash';
import {teardownSession} from './AuthenticationActions';
import * as api from '../api/chatApi';
import * as socket from './AppActions';
import transformChat from '../utility/transformChat';

const chatCursor = tree.select(['chat']);
const conversationCursor = tree.select(['conversation']);
const savedMessagesCursor = tree.select(['messages']);
const messagesCursor = tree.select(['chat', 'activeChat', 'chats']);

export async function openChat(conversation) { 
  conversationCursor.set(conversation);
}

export async function addChat(chat) {
  socket.addChat(chat);
}

export async function addChatToUi(msg) {
  const array = savedMessagesCursor.get() || [];
  array.push(transformChat(msg));
  savedMessagesCursor.set(array);
}

export async function saveLastChatInConversation(chatId, conversationId) {
  api.updateConversation(chatId, conversationId)
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

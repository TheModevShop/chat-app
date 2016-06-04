const ChatFacet = require('./facets/ChatFacet')

export default function getInitialState() {
  return {
    cursors: {
      classes: {},
      modal: {},
      chat: {
        activeChat: {
          user: null,
          chats: []
        }
      },
    },
    facets: {facets: {Chat: ChatFacet}}
  };
}



const ChatFacet = require('./facets/ChatFacet').default();
const ConversationFacet = require('./facets/ConversationFacet').default();
const UsersFacet = require('./facets/UsersFacet').default();

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
    facets: {facets: {
      Chat: ChatFacet,
      Conversation: ConversationFacet,
      Users: UsersFacet
    }}
  };
}



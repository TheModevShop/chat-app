const ChatFacet = require('./facets/ChatFacet').default();
const ConversationFacet = require('./facets/ConversationFacet').default();
const AllConversationFacet = require('./facets/AllConversationFacet').default();
const UsersFacet = require('./facets/UsersFacet').default();
const AllSessionsFacet = require('./facets/AllSessionsFacet').default();
const SessionDetailsFacet = require('./facets/SessionDetailsFacet').default();
const SearchFacet = require('./facets/SearchFacet').default();
const SkillsFacet = require('./facets/SkillsFacet').default();

export default function getInitialState() {
  return {
    cursors: {
      sessionDetails: {
        id: null,
        details: null
      },
      sessionSearch: {
        query: '',
        results: ''
      },
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
      Users: UsersFacet,
      AllConversations: AllConversationFacet,
      AllSessionsFacet: AllSessionsFacet,
      SessionDetails: SessionDetailsFacet,
      Search: SearchFacet,
      Skills: SkillsFacet
    }}
  };
}



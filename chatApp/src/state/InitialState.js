const ChatFacet = require('./facets/ChatFacet').default();
const ConversationFacet = require('./facets/ConversationFacet').default();
const AllConversationFacet = require('./facets/AllConversationFacet').default();
const UsersFacet = require('./facets/UsersFacet').default();
const AllSessionsFacet = require('./facets/AllSessionsFacet').default();
const SessionDetailsFacet = require('./facets/SessionDetailsFacet').default();
const SearchFacet = require('./facets/SearchFacet').default();
const SkillsFacet = require('./facets/SkillsFacet').default();
const MyListingsFacet = require('./facets/MyListingsFacet').default();
const ListingDetailsFacet = require('./facets/ListingDetailsFacet').default();
const ListingSessionsFacet = require('./facets/ListingSessionsFacet').default();
const AllListingsFacet = require('./facets/AllListingsFacet').default();
const SkillAvailabilityFacet = require('./facets/SkillAvailabilityFacet').default();

export default function getInitialState() {
  return {
    cursors: {
      sessionDetails: {
        id: null,
        details: null
      },
      listingDetails: {
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
      newPaymentMethod: {
        card: {}
      },
      listingAvailability: {
        pannedDays: null
      }
    },
    listingFilters: {
      instructor: null,
      skill: null,
    },
    facets: {facets: {
      Chat: ChatFacet,
      Conversation: ConversationFacet,
      Users: UsersFacet,
      AllConversations: AllConversationFacet,
      AllSessionsFacet: AllSessionsFacet,
      SessionDetails: SessionDetailsFacet,
      Search: SearchFacet,
      Skills: SkillsFacet,
      MyListings: MyListingsFacet,
      ListingDetails: ListingDetailsFacet,
      ListingSessions: ListingSessionsFacet,
      AllListings: AllListingsFacet,
      SkillAvailability: SkillAvailabilityFacet
    }}
  };
}



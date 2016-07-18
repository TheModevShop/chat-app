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
const PopularSkillsFacet = require('./facets/PopularSkillsFacet').default();
const PopularListingsFacet = require('./facets/PopularListingsFacet').default();
const ListingSessionsAvailabilityFacet = require('./facets/ListingSessionsAvailabilityFacet').default();
const MyUpcomingSessionsFacet = require('./facets/MyUpcomingSessionsFacet').default();
const MyFavoritesListingsFacet = require('./facets/MyFavoritesListingsFacet').default();
export default function getInitialState() {
  return {
    cursors: {
      // Facets Loaders
      sessions: {},
      
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
      },

      listingFilters: {
        instructor: null,
        skill: null,
      },
      sessionFilters: {
        listing: null,
        start: null,
        end: null,
      },
    },
    facets: {
      facets: {
        Chat: ChatFacet,
        Conversation: ConversationFacet,
        Users: UsersFacet,
        AllConversations: AllConversationFacet,
        AllSessionsFacet: AllSessionsFacet,
        SessionDetails: SessionDetailsFacet,
        Search: SearchFacet,
        
        MyListings: MyListingsFacet,
        ListingDetails: ListingDetailsFacet,
        ListingSessions: ListingSessionsFacet,
        
        AllListings: AllListingsFacet,
        PopularListings: PopularListingsFacet,
        
        Skills: SkillsFacet,
        SkillAvailability: SkillAvailabilityFacet,
        PopularSkills: PopularSkillsFacet,
        ListingSessionsAvailability: ListingSessionsAvailabilityFacet,

        MyUpcomingSessions: MyUpcomingSessionsFacet,

        MyFavoritesListings: MyFavoritesListingsFacet
      }
    }
  };
}



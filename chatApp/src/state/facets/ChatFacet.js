import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (conversationId) => {
    return `${BASE}/chats?conversationId=${conversationId}`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function ChatFacet() {
  return Baobab.monkey({
    cursors: {
      messages: ['messages'],
      chat: ['chat', 'activeChat', 'chats'],
      conversation: ['conversation']
    },
    get(data) {
      if (data.conversation && data.conversation._id) {
        let request;
        
        if (data.messages && data.messages.stale) {
          loader.invalidateCache();
        }

        if (!loader.cursor) {
          loader.setCursor(this.select(['messages']));
        }

        request = _.clone(loader.fetch(data.conversation._id));
        request = request.$isLoading ? data.chat.concat(request) : request;
        return request;
      }
    }
  });
};


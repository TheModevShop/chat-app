import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id, id2) => {
    const array = JSON.stringify([id, id2])
    return `${BASE}/me/conversations`;
  },
  successTransformer: (data, current) => {
    return {
      items: data.body
    }
  }
});

export default function AllConversationFacet() {
  return Baobab.monkey({
    cursors: {
      conversations: ['allConversations']
    },
    get(data) {
      let request;
      
      if (data.conversations && data.conversations.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['allConversations']));
      }
      request = _.clone(loader.fetch());
      console.log(request, 'sdfjsadkfjaslfjksalkfjasld')
      return request;
    }
  });
};


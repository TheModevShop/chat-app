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
    return data.body;
  }
});

export default function AllConversationFacet() {
  return Baobab.monkey({
    cursors: {
      conversations: ['conversations']
    },
    get(data) {
      let request;
      
      if (data.conversation && data.conversation.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['conversations']));
      }
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


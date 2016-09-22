import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id, id2) => {
    const array = JSON.stringify([id, id2])
    return `${BASE}/conversations?users=${array}`;
  },
  successTransformer: (data, current) => {
    return {
      items: data.body
    }
  }
});

export default function ConversationFacet() {
  return Baobab.monkey({
    cursors: {
      user: ['user'],
      chat: ['chat', 'activeChat', 'chats'],
      chatWith: ['chat', 'activeChat', 'user'],
      conversation: ['conversation']
    },
    get(data) {
      let request;
      
      if (data.conversation && data.conversation.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['conversation']));
      }
      
     request = _.clone(loader.fetch(data.user.details._id, data.chatWith._id));

      return request;
    }
  });
};


import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: ({userOne, userTwo}) => {
    const array = JSON.stringify([userOne, userTwo]);
    return `${BASE}/conversations?users=${array}`;
  },
  successTransformer: (data, current) => {
    console.log(data.body)
    return {
      conversation_id: _.get(data.body, 'conversation_id')
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
      let requestData;
      if (_.get(data, 'conversation.conversation_id')) {
        requestData = {
          conversationId: data.conversation.conversation_id
        }
      } else {
        requestData = {
          userOne: _.get(data.user, 'details.id'),
          userTwo: _.get(data, 'chatWith.id')
        }
      }
     request = _.clone(loader.fetch(requestData));
    
      return request;
    }
  });
};


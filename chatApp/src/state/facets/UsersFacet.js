import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/users`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function UsersFacet() {
  return Baobab.monkey({
    cursors: {
      users: ['users'],
    },
    get(data) {
      let request;
      
      if (data.users && data.users.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['users']));
      }
     request = _.clone(loader.fetch());
      return request;
    }
  });
};


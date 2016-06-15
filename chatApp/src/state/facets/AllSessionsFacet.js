import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/sessions`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function AllSessionsFacet() {
  return Baobab.monkey({
    cursors: {
      sessions: ['sessions']
    },
    get(data) {
      let request;
      
      if (data.sessions && data.sessions.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['sessions']));
      }
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


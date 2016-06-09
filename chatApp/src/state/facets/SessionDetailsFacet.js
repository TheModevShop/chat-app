import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/sessions/${id}`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function SessionDetailsFacet() {
  return Baobab.monkey({
    cursors: {
      sessionDetails: ['sessionDetails', 'details'],
      activeSession: ['sessionDetails', 'id']
    },
    get(data) {
      let request;
      if (data.sessionDetails && data.sessionDetails.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['sessionDetails', 'details']));
      }
      request = _.clone(loader.fetch(data.activeSession));
      return request;
    }
  });
};


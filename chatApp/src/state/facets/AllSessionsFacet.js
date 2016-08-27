import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import parseDate from '../../utility/parseDate';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    return `${BASE}/sessions?listing=${queryParams.listing || ''}&startDate=${queryParams.start || ''}&endDate=${queryParams.end || ''}`;
  },
  successTransformer: (data, current) => {
    return _.map(data.body, (session) => {
      session.date = parseDate(session.date, session.time);
      return session;
    })
  }
});

export default function AllSessionsFacet() {
  return Baobab.monkey({
    cursors: {
      sessions: ['sessions'],
      sessionFilters: ['sessionFilters']
    },
    get(data) {
      let request;
      if (data.sessions && data.sessions.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['sessions']));
      }
      request = _.clone(loader.fetch(data.sessionFilters));
      return request;
    }
  });
};


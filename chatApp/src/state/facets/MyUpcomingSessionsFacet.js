import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import parseDate from '../../utility/parseDate';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    const startDate = moment().subtract(3, 'months').format('YYYYMMDD');
    const endDate = moment().add(3, 'months').format('YYYYMMDD');
    return `${BASE}/me/sessions?startDate=${startDate}&endDate=${endDate}&limit=200`; //may be able to get rid of instructor true, save on server
  },
  successTransformer: (data, current) => {
    return _.map(data.body, (session) => {
      session.date = parseDate(session.date, session.time);
      return session;
    })
  }
});

export default function MyUpcomingSessionsFacet() {
  return Baobab.monkey({
    cursors: {
      sessions: ['upcomingSessions']
    },
    get(data) {
      let request;
      if (data.sessions && data.sessions.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['upcomingSessions']));
      }
      request = _.clone(loader.fetch());
      console.log(request)
      return request;
    }
  });
};


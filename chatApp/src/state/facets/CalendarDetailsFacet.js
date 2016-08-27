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

export default function CalendarDetailsFacet() {
  return Baobab.monkey({
    cursors: {
      calendarDetails: ['calendarDetails', 'details'],
      activeSession: ['calendarDetails', 'id']
    },
    get(data) {
      let request;
      if (data.calendarDetails && data.calendarDetails.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['calendarDetails', 'details']));
      }
      request = _.clone(loader.fetch(data.activeSession));
      return request;
    }
  });
};


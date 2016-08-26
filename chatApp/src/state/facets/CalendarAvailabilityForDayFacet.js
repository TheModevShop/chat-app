import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (id, filters) => {
    return `${BASE}/calendars/${id}/availability?startDate=${filters.start}&endDate=${filters.end}`;
  },
  successTransformer: (data, current) => {
    console.log(data.body)
    return data.body;
  }
});

export default function CalendarAvailabilityForDayFacet() {
  return Baobab.monkey({
    cursors: {
      calendarDayView: ['calendarDayView'],
      activeListing: ['listingDetails', 'id'],
      sessionFilters: ['sessionFilters']
    },
    get(data) {
      let request;
      if (data.calendarDayView && data.calendarDayView.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['calendarDayView']));
      }
      request = _.clone(loader.fetch(data.activeListing, data.sessionFilters));
      return request;
    }
  });
};


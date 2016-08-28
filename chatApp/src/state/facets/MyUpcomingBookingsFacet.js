import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import parseDate from '../../utility/parseDate';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    const startDate = moment().subtract(3, 'months').format();
    const endDate = moment().add(3, 'months').format();
    return `${BASE}/me/bookings?start=${startDate}&end=${endDate}&limit=200`; //may be able to get rid of instructor true, save on server
  },
  successTransformer: (data, current) => {
    return data.body
  }
});

export default function MyUpcomingBookingsFacet() {
  return Baobab.monkey({
    cursors: {
      bookings: ['upcomingBookings']
    },
    get(data) {
      let request;
      if (data.bookings && data.bookings.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['upcomingBookings']));
      }
      request = _.clone(loader.fetch());
      console.log(request)
      return request;
    }
  });
};


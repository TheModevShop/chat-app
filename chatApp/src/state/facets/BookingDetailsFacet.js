import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/me/bookings/${id}`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function BookingDetailsFacet() {
  return Baobab.monkey({
    cursors: {
      bookingDetails: ['bookingDetails', 'details'],
      activeBooking: ['bookingDetails', 'id']
    },
    get(data) {
      let request;
      if (data.bookingDetails && data.bookingDetails.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['bookingDetails', 'details']));
      }
      request = _.clone(loader.fetch(data.activeBooking));
      return request;
    }
  });
};


import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/calendars/${id}/availability?group=true&distinct=true&startDate=${moment().format()}&endDate=${moment().add(2, 'months').format()}`;
  },
  successTransformer: (data, current) => {    
    return _.map(data.body, (value, key) => {
      console.log(key)
      return key;
    })
  }
});

export default function ListingSessionsAvailabilityFacet() {
  return Baobab.monkey({
    cursors: {
      listingSessionsAvailability: ['listingSessionsAvailability'],
      activeListing: ['listingDetails', 'id']
    },
    get(data) {
      let request;
      if (data.listingAvailability && data.listingAvailability.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['listingSessionsAvailability']));
      }
      request = _.clone(loader.fetch(data.activeListing));
      return request;
    }
  });
};


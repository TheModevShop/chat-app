import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/listings/${id}/sessions/availability`;
  },
  successTransformer: (data, current) => {
    return data.body;
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


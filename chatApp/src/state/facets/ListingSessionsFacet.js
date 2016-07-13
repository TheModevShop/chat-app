import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/listings/${id}/sessions`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function ListingSessionsFacet() {
  return Baobab.monkey({
    cursors: {
      listingSessions: ['listingSessions'],
      activeListing: ['listingDetails', 'id']
    },
    get(data) {
      let request;
      if (data.listingDetails && data.listingDetails.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['listingSessions']));
      }
      request = _.clone(loader.fetch(data.activeListing));
      return request;
    }
  });
};


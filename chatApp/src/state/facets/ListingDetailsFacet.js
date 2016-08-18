import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/calendars/${id}`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function ListingDetailsFacet() {
  return Baobab.monkey({
    cursors: {
      listingDetails: ['listingDetails', 'details'],
      activeListing: ['listingDetails', 'id']
    },
    get(data) {
      let request;
      if (data.listingDetails && data.listingDetails.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['listingDetails', 'details']));
      }
      request = _.clone(loader.fetch(data.activeListing));
      return request;
    }
  });
};


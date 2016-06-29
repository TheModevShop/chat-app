import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/me/listings`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function MyListingsFacet() {
  return Baobab.monkey({
    cursors: {
      listings: ['listings']
    },
    get(data) {
      let request;
      
      if (data.listings && data.listings.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['listings']));
      }
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


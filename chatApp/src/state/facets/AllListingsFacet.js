import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    return `${BASE}/listings?instructor=${queryParams.instructor || ''}&skill=${queryParams.skill || ''}`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function AllListingsFacet() {
  return Baobab.monkey({
    cursors: {
      listings: ['listings'],
      listingFilters: ['listingFilters']
    },
    get(data) {
      let request;
      
      if (data.listings && data.listings.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['listings']));
      }
   
      request = _.clone(loader.fetch(data.listingFilters));
      return request;
    }
  });
};


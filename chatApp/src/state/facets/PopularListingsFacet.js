import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    return `${BASE}/services/popular`;
  },
  successTransformer: (data, current) => {
    console.log(data.body)
    return data.body;
  }
});

export default function PopularListingsFacet() {
  return Baobab.monkey({
    cursors: {
      popularListings: ['popularListings']
    },
    get(data) {
      let request;
      
      if (data.popularListings && data.popularListings.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['popularListings']));
      }
   
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


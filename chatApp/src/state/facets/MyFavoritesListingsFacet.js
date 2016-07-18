import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import parseDate from '../../utility/parseDate';
import Baobab from 'baobab';
import moment from 'moment';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    return `${BASE}/me/listings/favorites`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function MyFavoritesListingsFacet() {
  return Baobab.monkey({
    cursors: {
      favorites: ['favoriteListings']
    },
    get(data) {
      let request;
      if (data.favorites && data.favorites.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['favoriteListings']));
      }
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


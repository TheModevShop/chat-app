import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';
import parseDate from '../../utility/parseDate';

const loader = new RESTLoader({
  getResourceUrl: (queryParams = {}) => {
    return `${BASE}/sessions/availability?instructor=${queryParams.instructor || ''}&skill=${queryParams.skill || ''}`;
  },
  successTransformer: (data, current) => {
    return _.map(data.body, (date) => {
      return parseDate(date)
    })
  }
});

export default function SkillAvailabilityFacet() {
  return Baobab.monkey({
    cursors: {
      availability: ['sessionsAvailability'],
      listingFilters: ['listingFilters']
    },
    get(data) {
      let request;
      
      if (data.availability && data.availability.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['sessionsAvailability']));
      }
      request = _.clone(loader.fetch(data.listingFilters));
      return request;
    }
  });
};


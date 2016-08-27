import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/me/calendars`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function MyCalendarsFacet() {
  return Baobab.monkey({
    cursors: {
      calendars: ['calendars']
    },
    get(data) {
      let request;
      
      if (data.calendars && data.calendars.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['calendars']));
      }
      request = _.clone(loader.fetch());
      return request;
    }
  });
};


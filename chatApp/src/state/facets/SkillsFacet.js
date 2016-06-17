import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/skills`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function SkillsFacet() {
  return Baobab.monkey({
    cursors: {
      skills: ['skills'],
    },
    get(data) {
      let request;
      
      if (data.skills && data.skills.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['skills']));
      }
     request = _.clone(loader.fetch());
      return request;
    }
  });
};


import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/skills/popular`;
  },
  successTransformer: (data, current) => {
    return data.body;
  }
});

export default function PopularSkillsFacet() {
  return Baobab.monkey({
    cursors: {
      popularSkills: ['popularSkills'],
    },
    get(data) {
      let request;
      
      if (data.skills && data.skills.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['popularSkills']));
      }
     request = _.clone(loader.fetch());
      return request;
    }
  });
};


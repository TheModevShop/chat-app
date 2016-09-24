import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/skills/categories`;
  },
  successTransformer: (data, current) => {
    console.log(data)
    return {
     items: data.body
    }
  }
});

export default function SkillCategoriesFacet() {
  return Baobab.monkey({
    cursors: {
      skillCategories: ['skillCategories'],
    },
    get(data) {
      let request;
      
      if (data.skills && data.skills.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.select(['skillCategories']));
      }
     request = _.clone(loader.fetch());
      return request;
    }
  });
};


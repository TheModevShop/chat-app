import xhr from 'utility/xhr';
import _ from 'lodash';
import tree from '../StateTree';

export default class RESTLoader {

  constructor(opts) {
    this.options = opts;
    this.loading = false;
    this.cacheValid = true;
  }

  _get(id, ...args) {
    const {
      errorTransformer,
      successTransformer,
      timeout
    } = this.options;
    this.loading = true;
    return xhr('GET', this.options.getResourceUrl(id, ...args), null, {timeout})
      .then((data) => {
        if (_.isFunction(successTransformer)) {
          data = successTransformer(data, this.cursor.get());
        }
        this.cursor.set(data);
      })
      .catch((e) => {
        const current = this.cursor.get();
        let data;
        if (_.isFunction(errorTransformer)) {
          data = errorTransformer(e, current);
        } else {
          data = _.assign({}, current, {
            error: e
          });
        }
        this.cursor.set(data);
        tree.commit();
      }).finally(() => {
        this.loading = false;
        this.cacheValid = true;
      });
  }

  fetch(id, ...args) {
    const items = this.cursor.get();
    // return items or loading items if cache is valid

    if ((items && this.cacheValid) || this.loading) {
      return items;
    }

    // fetch new data
    this._get(id, ...args);

    // Return current item with loading mixin
    return _.assign({}, items, {
      isLoading: true
    });
  }

  setCursor(cursor) {
    this.cursor = cursor;
  }

  invalidateCache() {
    this.cacheValid = false;
  }

}
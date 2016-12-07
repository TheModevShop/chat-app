import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/me/payment-methods`;
  },
  successTransformer: (data, current) => {
    return data.body
  }
});

export default function PaymentMethodsFacet() {
  return Baobab.monkey({
    cursors: {
      paymentMethods: ['paymentMethods'],
      authentication: ['authentication', 'sessionData']
    },
    get(data) {
      console.log('dsafsadfsdafsadfsd',data, 'sadfkljsdfjkl')
      if (data.authentication) {
        let request;
        if (data.paymentMethods && data.paymentMethods.stale) {
          loader.invalidateCache();
        }

        if (!loader.cursor) {
          loader.setCursor(this.select(['paymentMethods']));
        }
        request = _.clone(loader.fetch());
        console.log('payment methods', request)
        return request;
      }
    }
  });
};


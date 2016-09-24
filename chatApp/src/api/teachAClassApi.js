import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function registerResourceAndService(service, resource) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/services/add`, {service, resource}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}


export async function registerService(service) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/services/add`, {service}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}

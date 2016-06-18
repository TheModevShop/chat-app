import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addSession(session) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/session`, {session}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}



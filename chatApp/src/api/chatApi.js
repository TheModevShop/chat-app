import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function updateConversation(chat, id) {
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/conversations/${id}`, {last_message: chat}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}



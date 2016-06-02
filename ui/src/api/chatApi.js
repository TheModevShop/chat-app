import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function addChat(chat) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/chats`, chat).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

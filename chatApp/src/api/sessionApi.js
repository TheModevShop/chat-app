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

export async function addBulkSessions(sessions, listingId) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/listings/${listingId}/sessions/batch`, {sessions}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}


export function bookListingCalendar(calendars) {
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/me/sessions/enroll`, {sessions: calendars}).then((data) => {
      resolve(data);
    }).catch((err) => {
      console.log(err)
      reject(err);      
    });
  });
}



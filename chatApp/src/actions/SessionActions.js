import tree from '../state/StateTree';
import _ from 'lodash';
import {addChatToUi} from './ChatActions';
import * as api from '../api/sessionApi';
import moment from 'moment';

const sessions = tree.select(['sessions']);
const sessionDetails = tree.select(['sessionDetails']);
const sessionFilters = tree.select(['sessionFilters']);

export function invalidateListingCache() {
  sessions.set({stale: true})
}

export function setSessionDateRange(start, end) {
  sessionFilters.set(['start'], start);
  sessionFilters.set(['end'], end);
}

export function setSessionListingFilter(listing) {
  sessionFilters.set(['listing'], listing);
}

export async function setActiveSession(id) {
  sessionDetails.set(['id'], id)
}

export async function resetActiveSession() {
  sessionDetails.set({
    id: null,
    details: null
  })
}

export async function addSession(session) {
  try {
    const addedSession = await api.addSession(JSON.stringify(session));
    console.log(addedSession);
  } catch(err) {
    console.log(err)
  }
}


export async function buildSessionRequest(newAvailability, currentAvailability, listing) {
  const times = _.map(newAvailability.pannedDays, (panned) => {
    const time = moment(panned.time, 'h:mm').format('H:mm');
    const date = moment(panned.day.day, 'YYYYMMDD').set('hour', time.split(':')[0]).set('minute', time.split(':')[1]).format();
    return {
      time: moment(panned.time, 'h:mm').format('H:mm'),
      date: panned.day.day.format('YYYYMMDD'),
      dateAndTime: date
    }
  });

  const addedSessions = await api.addBulkSessions(JSON.stringify({times: times}), listing._id);
  
}
import tree from '../state/StateTree';
import _ from 'lodash';
import {addChatToUi} from './ChatActions';
import * as api from '../api/sessionApi';
import moment from 'moment';

const sessions = tree.select(['sessions']);
const calendarDetails = tree.select(['calendarDetails']);
const sessionFilters = tree.select(['sessionFilters']);

const calendarDayView = tree.select(['calendarDayView']);

export function invalidateCalendarDayView() {
  calendarDayView.set({stale: true})
}

export function invalidateListingCache() {
  sessions.set({stale: true})
}

export function setSessionDateRange(start, end) {
  sessionFilters.set(['start'], start);
  sessionFilters.set(['end'], end);
  tree.commit()
}

export function setSessionListingFilter(listing) {
  sessionFilters.set(['listing'], listing);
  tree.commit()
}

export async function setActiveSession(id) {
  calendarDetails.set(['id'], id)
}

export async function resetActiveSession() {
  calendarDetails.set({
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


// export async function buildSessionRequest(newAvailability, currentAvailability, listing) {
//   const times = _.map(newAvailability.pannedDays, (panned) => {
//     const time = moment(panned.time, 'h:mm').format('H:mm');
//     const date = moment(panned.day.day, 'YYYYMMDD').set('hour', time.split(':')[0]).set('minute', time.split(':')[1]).format();
//     return {
//       time: moment(panned.time, 'h:mm').format('H:mm'),
//       date: panned.day.day.format('YYYYMMDD'),
//       dateAndTime: date
//     }
//   });
//   const addedSessions = await api.addBulkSessions(JSON.stringify({times: times}), listing.id);
// }


export async function bookListingCalendar(calendar) {
  let success;
  const start = moment(calendar.date).set('hour', calendar.start.split(':')[0]).set('minute', calendar.start.split(':')[1]).format();
  const end = moment(calendar.date).set('hour', calendar.end.split(':')[0]).set('minute', calendar.end.split(':')[1]).format();
  calendar = {
    calendar_id: calendar.data.calendar_id,
    start: start,
    end: end
  }
  try {
    await api.bookListingCalendar(JSON.stringify([calendar]));
    success = true;
  } catch (err) {
    return {
      error: _.get(err.body, 'error')
    }
  }

  return {success};
}
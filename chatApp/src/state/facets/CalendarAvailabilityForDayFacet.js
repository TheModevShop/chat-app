import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from '../../constants';
import Baobab from 'baobab';
import moment from 'moment';
window.moment = moment;
const loader = new RESTLoader({
  getResourceUrl: (id, filters) => {
    return `${BASE}/calendars/${id}/availability?startDate=${filters.start}&endDate=${filters.end}`;
  },
  successTransformer: (data, current) => {
    const moment = window.moment;
    const reduce = _.reduce(data.body, (accum, value, key) => {
      const now = moment(value.start, "HH:mm:ss"); 
      const end = moment(value.end, "HH:mm:ss"); 
      const duration = moment.duration(end.diff(now));
      const slots = (duration.asMinutes() / data.body[0].service_duration);
      const array = _.times(slots, function(number) {
        var now1 = _.cloneDeep(now)
        return {
          name: `${value.first_name} ${value.last_name}`,
          start: now1.add(value.service_duration * number, 'minutes').format('H:mm'),
          end: now1.add(value.service_duration, 'minutes').format('H:mm'),
          booked: false,
          facebook_user_id: value.facebook_user_id,
          date: value.date,
          raw_date: value.raw_date,
          data: value
        }
      });

      accum = accum.concat(array);
      return accum;
    }, [])

    return reduce;
  }
});

export default function CalendarAvailabilityForDayFacet() {
  return Baobab.monkey({
    cursors: {
      calendarDayView: ['calendarDayView'],
      activeListing: ['listingDetails', 'id'],
      sessionFilters: ['sessionFilters']
    },
    get(data) {
      if (_.get(data.sessionFilters, 'end') && _.get(data.sessionFilters, 'start')) {
        let request;
        if (data.calendarDayView && data.calendarDayView.stale) {
          loader.invalidateCache();
        }

        if (!loader.cursor) {
          loader.setCursor(this.select(['calendarDayView']));
        }
        request = _.clone(loader.fetch(data.activeListing, data.sessionFilters));
        return request;
      }
    }
  });
};


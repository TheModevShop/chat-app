import moment from 'moment';
export default function parseDate(number, time) {
  if (true) {
    if (time) {
      return moment(number, 'YYYYMMDD').set('hour', time.start.split(':')[0]).set('minute', time.start.split(':')[1]).format();
    } else {
      return moment(number, 'YYYYMMDD').format();
    }
  } 
  else {
    throw new Error('Invalid New Date');
  }
}
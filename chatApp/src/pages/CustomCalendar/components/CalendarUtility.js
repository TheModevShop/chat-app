import moment from 'moment';
import _ from 'lodash';

export function buildRow(duration = 60) {
  
  const hours = [];
  for (var i = 0; i < 14; i++) {
    hours.push(moment().startOf('day').add(6, 'hours').add(duration * i, 'minutes').format('H:mm'));
  }
  return hours;
}

export function makeDays(startDate, weekOffset, grouped) {
    var days = [],
        day,
        date = startDate.startOf('month'),
        diff = date.weekday() - weekOffset;

    if (diff < 0) {diff += 7;}

    // // Print Days In Prev Month
    var i;
    for (var i = 0; i < diff; i++) {
      const pm = moment([startDate.year(), startDate.month()]).startOf('month');
      day = pm.subtract((diff-i), 'day')
      days.push({
        formattedDay: day.format(), 
        day: day, 
        week: day.week(),
        classes: 'prev-month', 
        inactive: true
      });
    }

    // Print Days In Current Month
    var numberOfDays = date.daysInMonth();
    for (i = 1; i <= numberOfDays; i++) {
      day = moment([startDate.year(), startDate.month(), i]);
      const isBefore = moment().isAfter(day, 'day') ? 'prev-month' : '';
      days.push({
        week: day.week(), 
        formattedDay: day.format(), 
        day: day, classes: isBefore, 
        inactive: !!isBefore
      });
    }
    
    // Print Days In Next Month
    i = 1;
    while (days.length % 7 !== 0) {
      const nm = moment([startDate.year(), startDate.month()]).endOf('month');
      day = nm.add(i, 'day')
      days.push({
        week: day.week(), 
        formattedDay: day.format(), 
        day: day, 
        classes: 'next-month', 
        inactive: true});
      i++;
    }
    
    if (grouped) {
      return _.groupBy(days, 'week');
    }

    return days;
  }
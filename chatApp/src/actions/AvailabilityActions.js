import tree from '../state/StateTree';
import * as api from '../api/availabilityApi';
import _ from 'lodash';

const selectedTimesCursor = tree.select(['availability', 'selectedTimes']);
const selectedDaysCursor = tree.select(['availability', 'selectedDays']);
const selectedCalendarsCursor = tree.select(['availability', 'calendars']);
const dow = tree.select(['availability', 'dow']);

export async function addDayToAvailability(dow) {
  const selectedDays = _.cloneDeep(selectedDaysCursor.get()) || [];
  const index = _.indexOf(selectedDays, dow);
  if (index > -1) {
    selectedDays.splice(index, 1);
  } else {
    selectedDays.push(dow);
  }
  selectedDaysCursor.set(selectedDays);
  tree.commit();
}


export async function addTimesToAvailability(time) {
  const selectedTimes = _.cloneDeep(selectedTimesCursor.get());
  const index = _.indexOf(selectedTimes, time);
  if (index > -1) {
    selectedTimes.splice(index, 1);
  } else {
    selectedTimes.push(time);
  }
  selectedTimesCursor.set(selectedTimes);
  tree.commit();
}

export async function addAvailability(c) {
  const times = selectedTimesCursor.get();
  const calendars = c ? [c] : selectedCalendarsCursor.get();
  const days = selectedDaysCursor.get() || [];

  console.log({times, days, calendars})
  try {
    await api.addAvailability(JSON.stringify({times, days, calendars}))
  } catch(err) {

  }
}

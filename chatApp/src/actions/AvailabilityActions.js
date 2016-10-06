import tree from '../state/StateTree';
import * as api from '../api/availabilityApi';
import _ from 'lodash';

const selectedTimesCursor = tree.select(['availability', 'selectedTimes']);
const selectedCalendarsCursor = tree.select(['availability', 'calendars']);
const dow = tree.select(['availability', 'dow']);

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

export async function addAvailability() {
  const times = selectedTimesCursor.get();
  const calendars =  [15] //selectedCalendarsCursor.get();
  const days = [1, 3] //dow.get() || 0;
  try {
    await api.addAvailability(JSON.stringify({times, days, calendars}))
  } catch(err) {

  }
}

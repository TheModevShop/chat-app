import tree from '../state/StateTree';
import {openHud, closeHud} from '../actions/ModalActions';
import {Alert} from 'react-native';
import _ from 'lodash';
import * as api from '../api/bookingsApi';

const bookings = tree.select(['bookings']);
const bookingDetails = tree.select(['bookingDetails']);


export function invalidateBookingCache() {
  bookings.set({stale: true})
}


export async function setActiveBooking(id) {
  bookingDetails.set(['id'], id)
  bookingDetails.set(['details'], {stale: true})
}

export async function resetActiveBooking() {
  bookingDetails.set({
    id: null,
    details: null
  })
}

export async function cancelBooking(bookingId) {
  let cancellation;
  openHud({hudTitle: 'Cancelling Booking'});
  try {
    await api.cancelBooking(bookingId)
    cancellation = true;

  } catch(err) {
    closeHud();
    Alert.alert('Issue', 'there was an error', [{text: 'OK'}])
  }
  closeHud();
  return cancellation;
}

export async function dropBooking(bookingId) {
  let drop;
  openHud({hudTitle: 'Dropping Booking'});
  try {
    await api.dropBooking(bookingId)
    drop = true;

  } catch(err) {
    closeHud();
    Alert.alert('Issue', 'there was an error', [{text: 'OK'}])
  }
  closeHud();
  return drop;
}

export async function completeBooking(bookingId) {
  let completion;
  openHud({hudTitle: 'Completing Booking'});
  try {
    await api.completeBooking(bookingId)
    completion = true;

  } catch(err) {
    closeHud();
    Alert.alert('Issue', 'there was an error', [{text: 'OK'}])
  }
  closeHud();
  return completion;
}

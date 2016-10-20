import tree from '../state/StateTree';
import _ from 'lodash';
import * as api from '../api/listingsApi';

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

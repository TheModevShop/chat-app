import tree from '../state/StateTree';
import _ from 'lodash';
import * as api from '../api/listingsApi';

const listings = tree.select(['listings']);
const listingDetails = tree.select(['listingDetails']);
const listingAvailability = tree.select(['listingAvailability']);
const listingFilters = tree.select(['listingFilters']);

export function invalidateListingCache() {
  listings.set({stale: true})
}

export function setListingSkillFilter(skill) {
  listingFilters.set(['skill'], skill)
}

export async function setActiveListing(id) {
  listingDetails.set(['id'], id)
}

export async function resetActiveListing() {
  listingDetails.set({
    id: null,
    details: null
  })
}

export async function addListing(listing) {
  try {
    const addedListing = await api.addListing(JSON.stringify(listing));
  } catch(err) {
    console.log(err)
  }
}



export async function addListingAvailability(days) {
  listingAvailability.set(['pannedDays'], days);
  tree.commit();
}
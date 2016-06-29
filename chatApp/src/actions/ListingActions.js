import tree from '../state/StateTree';
import _ from 'lodash';
import * as api from '../api/listingsApi';

export async function addListing(listing) {
  try {
    const addedListing = await api.addListing(JSON.stringify(listing));
    console.log(addedListing);
  } catch(err) {
    console.log(err)
  }
}
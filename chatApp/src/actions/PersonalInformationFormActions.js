// import tree, {addLoader} from '../state';
// import _ from 'lodash';

// const newShippingAddress = tree.select(['newShippingAddress', 'address']);
// const addressesCursor = tree.select(['addresses']);

// addLoader('addresses', async (data, solvedPath) => {
//   if (!data || data.stale) {
//     loadAddressData(solvedPath)
//   }
// })

// async function loadAddressData(solvedPath) {
//   tree.set(solvedPath.concat(['$isLoading']), true);
//   const json = await fetchJSON(`${WIKIBUY_API_URL}/address`);
//   tree.set(solvedPath, json)
// }

// export function resetNewShippingAddress() {
//   newShippingAddress.set({});
// }

// export function setAllAddressValues(addressObject) {
//   newShippingAddress.set(addressObject);
//   tree.commit();
// }


// export function setAddressValue(type, value) {
//   newShippingAddress.set(type, value);
//   tree.commit();
// }

// export function addLocationToAddress({city, state}) {
//   newShippingAddress.set('city', {value: city});
//   newShippingAddress.set('state', {value: state});
//   tree.commit();
// }


// export function removeLocationFromAddress() {
//   newShippingAddress.set('city', {value: null});
//   newShippingAddress.set('state', {value: null});
//   tree.commit();
// }


// export async function locationRequested(zip) {
//   const location = await fetchJSON(`${WIKIBUY_API_URL}/zip/${zip}`, {
//     method: 'GET'
//   });
//   return _.pick(location, ['city', 'state', 'zipcode']);
// }


// export async function saveShippingAddress(address) {
//   let newAddress;
//   try {
//     const createAddress = await saveAddress(address);
//     addressesCursor.set(['stale'], true);
//     loadAddressData(['addresses']);
//     address.id = createAddress.id;
//     newAddress = address;
//   } catch (err) {
//   }
//   return newAddress;
// }

// export async function saveAddress(address) {
//   return await fetchJSON(`${WIKIBUY_API_URL}/address`, {
//     method: 'POST',
//     body: JSON.stringify(address)
//   });
// }


// // GOOGLE API
// export async function queryGoogleAutoComplete(query) {
//   let predictions = []
//   try {
//     const search = await fetchJSON(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyBzVYJRs-wYJCtarfAiB2admRlK845AOpU&language=en&input=${query}`, {
//       method: 'GET'
//     });
//     predictions = _.get(search, 'predictions') || []
//   } catch(err) {}
//   return predictions;
// }

// export async function placeDetails(id) {
//   let place;
//   try {
//     let result = await fetchJSON(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyBzVYJRs-wYJCtarfAiB2admRlK845AOpU`, {
//       method: 'GET'
//     });
//     result = _.get(result, 'result.address_components');
//     if (result) {
//       const format = formatResults(result)
//       place = {
//         street_line_1: format.street_number ? `${format.street_number} ${format.route}` : null,
//         city: format.locality || '',
//         state: format.administrative_area_level_1 || '',
//         zipcode: format.postal_code || ''
//       }
//     }
//   } catch(err) {}
//   return place;
// }

// function formatResults(components) {
//   return _.fromPairs( _.map(components, function(c){ 
//     return [c.types[0], c.short_name]
//   }))
  
// }
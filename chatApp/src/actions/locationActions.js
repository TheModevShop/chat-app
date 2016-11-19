import tree from '../state/StateTree';
import _ from 'lodash';
import * as api from '../api/addressApi';

const newShippingAddress = tree.select(['newShippingAddress', 'address']);
const addressesCursor = tree.select(['addresses']);


export function formatAddressToEdit(address) {
  const obj = _.chain(address).pick(['id', 'firstname', 'lastname', 'street_line_1', 'street_line_2', 'zipcode', 'phone', 'city', 'state']).mapValues((value) => {
    return {value}
  }).value();
  newShippingAddress.set(obj);
  tree.commit();
}


export async function saveAddress(address) {
  let newAddress;
  try {
    const createAddress = await api.addAddress(address);
  } catch (err) {}
  return newAddress;
}



// GOOGLE API
export async function queryGoogleAutoComplete(query) {
  let predictions = []
  try {
    const search = await fetchJSON(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyCTmVa4hht3IncvL7xfYirw9g0hreChefc&language=en&input=${query}&components=country:us`, {
      method: 'GET'
    });
    predictions = _.get(search, 'predictions') || []
  } catch(err) {}
  return predictions;
}

export async function placeDetails(id) {
  let place;
  try {
    let result = await fetchJSON(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyCTmVa4hht3IncvL7xfYirw9g0hreChefc`, {
      method: 'GET'
    });
  
    if (result) {
      const format = formatResults(_.get(result, 'result.address_components'))
      place = {
        street_address_1: format.street_number ? `${format.street_number} ${format.route}` : null,
        city: format.locality || '',
        state: format.administrative_area_level_1 || '',
        zipcode: format.postal_code || '',
        lat: _.get(result, 'result.geometry.location.lat'),
        lng: _.get(result, 'result.geometry.location.lng'),
        name: _.get(result, 'result.name'),
        icon: _.get(result, 'result.icon'),
        google_id: _.get(result, 'result.place_id'),
      }
    }
  } catch(err) {}
  return place;
}

function formatResults(components) {
  return _.fromPairs( _.map(components, function(c){
    return [c.types[0], c.short_name]
  }))

}

async function fetchJSON(url, options={}) {
  const resp = await fetch(url, _.assign({
    headers: {
      'Content-Type': 'application/json'
    }
  }, options));
  const json = await resp.json();
  if (!resp.ok) {
    const err = new Error(json)
    err.fetchJSON = {
      response: resp,
      json
    }
    throw err
  }
  return json
}


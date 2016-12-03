import tree from '../state/StateTree';
import {openHud, closeHud} from '../actions/ModalActions';
import {WIKIBUY_API_URL} from '../constants';
import addStripeCard from '../utility/stripe';
import * as api from '../api/paymentApi';
import _ from 'lodash';
import {
  Alert
} from 'react-native'

const newPaymentMethod = tree.select(['newPaymentMethod', 'card']);

export function resetNewPaymentMethod() {
  newPaymentMethod.set({}, true);
}


export function setAllCardValues(addressObject) {
  newPaymentMethod.set(addressObject);
  tree.commit();
}

export function setCardValue(type, value) {
  newPaymentMethod.set(type, value);
  tree.commit();
}

export async function submitPaymentMethod(card, reset = true) {
  let newCard;
  openHud({hudTitle: 'Saving Payment Method'});
  try {
    const tokenResponse = await addStripeCard(card)
    const stripeCard = await tokenResponse.text()
    const stripeJson = JSON.parse(stripeCard)
    const token = _.get(stripeJson, 'id');
    const newCardResp = await api.addCard(token);
    if (newCardResp) {
      const error = _.get(newCardResp, 'error')
      newCard = newCardResp;
      fetchAndStoreAll()
      if (reset) {
        resetNewPaymentMethod()
      }
    } else {
      closeHud();
      Alert.alert('Issue', 'Error contacting payment processor', [{text: 'OK'}])
    }
  } catch(err) {
    closeHud();
    Alert.alert('Issue', 'there was an error', [{text: 'OK'}])
  }
  closeHud();
  return newCard;
}



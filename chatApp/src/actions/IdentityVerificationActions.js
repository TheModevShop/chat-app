import tree from '../state/StateTree';
import {openHud, closeHud} from '../actions/ModalActions';
import {WIKIBUY_API_URL} from '../constants';
import addStripeCard from '../utility/stripe';
import * as api from '../api/paymentApi';
import _ from 'lodash';
import {
  Alert
} from 'react-native'

const identityVerification = tree.select(['identityVerification']);

export function resetIdentityVerification() {
  identityVerification.set({});
}


export function setAllVerificationValues(identityVerification) {
  identityVerification.set(identityVerification);
  tree.commit();
}

export function setVerificationValue(type, value) {
  newPaymentMethod.set(type, value);
  tree.commit();
}

export async function submitVerification(card, reset = true) {
  let newCard;
  openHud({hudTitle: 'Saving Verificiation'});
  try {
    const tokenResponse = await addStripeCard(card)
    const stripeCard = await tokenResponse.text()
    const stripeJson = JSON.parse(stripeCard)
    const token = _.get(stripeJson, 'id');
    const newCardResp = await api.addCard(token);
    if (newCardResp) {
      newCard = newCardResp;
      if (reset) {
        resetIdentityVerification()
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



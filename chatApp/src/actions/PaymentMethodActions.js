import tree from '../state/StateTree';
import {WIKIBUY_API_URL} from '../constants';
import addStripeCard from '../utility/stripe';
import * as actions from '../api/paymentApi';
import _ from 'lodash';

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

export async function submitPaymentMethod(card) {
  let newCard;
  try {
    const tokenResponse = await addStripeCard(card)
    const stripeCard = await tokenResponse.text();
    newCard = await actions.addCard(JSON.parse(stripeCard).id);
  } catch(err) {
    console.log(err)
  }
  return newCard;
}
import tree from '../state/StateTree';
import addStripeCard from '../utility/stripe.js';

const paymentMethodFormView = tree.select(['newPaymentMethod']);
const newCard = tree.select(['newPaymentMethod', 'card']);
const paymentMethodForm = tree.select(['newPaymentMethod']);


export async function setCreditCardValue(type, value) {
  newCard.set(type, value);
  tree.commit();
}

export async function clearNewCard(type, value) {
  paymentMethodForm.set({card: {}});
  tree.commit();
}

export async function setPaymentInformation(card, saveCard) {
  // let newCard;
  // paymentMethodFormView.set('awaitingSave', true);
  // try {
  //   newCard = await addStripeCard(card);
  //   if (saveCard) {
  //     newCard = await addCard(newCard);
  //     await getMe();
  //   }
  //   paymentMethodFormView.set(['serverResponse'], {success: 'Card Added'});
  // } catch (err) {
  //   err = 'Error submitting payment method';
  //   paymentMethodFormView.set(['serverResponse'], {error: err});
  // }
  // paymentMethodFormView.set('awaitingSave', false);
  // tree.commit();
  // return newCard;
}



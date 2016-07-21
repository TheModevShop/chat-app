"use strict";

const stripe_url = 'https://api.stripe.com/v1/';
// const secret_key = 'pk_live_HiksX6RjAZboFZEBLMya7iG8'; //TODO ENV

export default async function addStripeCard(card) {
  const cardDetails = {
    "card[name]": card.name,
    "card[number]": card.number,
    "card[cvc]": card.cvc,
    "card[exp_month]": card.exp_month,
    "card[exp_year]": card.exp_year
  }

  let formBody = [];
  _.forEach(cardDetails, (value, property) => {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(value);
    formBody.push(encodedKey + "=" + encodedValue);
  });

  formBody = formBody.join("&");

  return fetch(stripe_url + 'tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + secret_key
    },
    body: formBody
  });
};
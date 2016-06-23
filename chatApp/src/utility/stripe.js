export default async function addStripeCard(card) {
  return fetch('https://api.stripe.com/v1/tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + '<YOUR-STRIPE-API-KEY>'
    },
    body: formBody
  });
}
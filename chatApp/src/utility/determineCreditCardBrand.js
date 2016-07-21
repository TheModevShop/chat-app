import _ from 'lodash';
const prefix = 'https://cdn.ivaws.com/wikibuy-assets/images/credit_cards'

export default function determineCreditCardBrand(rawBrand) {
  let brand
  switch (rawBrand) {
    case "visa":
      brand = {
        brand: 'Visa',
        image: `${prefix}/cc-visa-32.png`
      }
      break

    case "mastercard":
      brand = {
        brand: 'Mastercard',
        image: `${prefix}/cc-mastercard-32.png`
      }
      break

    case "discover":
      brand = {
        brand: 'Discover',
        image: `${prefix}/cc-discover-32.png`
      }
      break

    case "amex":
      brand = {
        brand: 'Amex',
        image: `${prefix}/cc-amex-32.png`
      }
      break

    case "american express":
      brand = {
        brand: 'Amex',
        image: `${prefix}/cc-amex-32.png`
      }
      break

    case "dinersclub":
      brand = {
        brand: 'Diners Club',
        image: `${prefix}/cc-dinersclub-32.png`
      }
      break

    case "jcb":
      brand = {
        brand: 'JCB',
        image: `${prefix}/cc-jcb-32.png`
      }
      break

    case "paypal":
      brand = {
        brand: 'Pay Pal',
        image: `${prefix}/cc-paypal-32.png`
      }
      break

    default:
      brand = {
        brand: '',
        image: `${prefix}/cc-default-32.png`
      }
      break
  }

  return brand;
}
// import React from 'react';
// import _ from 'lodash';
// import {branch} from 'baobab-react/higher-order';
// import payform from 'payform';


// import {setCreditCardValue} from '../../actions/CreateAccountActions';
// const CREDIT_CARD = 'creditCard';
// const EXPIRATION_DATE = 'expirationDate';
// const SECURITY_CODE = 'securityCode';

// var PaymentMethodForm = React.createClass({
//   getInitialState () {
//     return {
//       formComplete: false
//     };
//   },

//   componentDidMount() {
//     payform.cardNumberInput(React.findDOMNode(this.refs.creditCard));
//     payform.expiryInput(React.findDOMNode(this.refs.expirationDate));
//     payform.cvcInput(React.findDOMNode(this.refs.securityCode));
//     this.validateForm(this.props.newCard.card);
//   },

//   componentWillReceiveProps(nextProps) {
//     if (!_.isEqual(nextProps.newCard.card, this.props.newCard.card)) {
//       this.validateForm(nextProps.newCard.card);
//     }

//     if (_.get(nextProps.newCard, 'awaitingSave')) {
//       if (this.refs.button) {
//         this.refs.button.loading();
//       }
//     }

//     if (_.get(this.props, 'newCard.serverResponse.success') !== _.get(nextProps, 'newCard.serverResponse.success') && _.get(nextProps, 'newCard.serverResponse.success')) {
//       if (this.refs.button) {
//         this.refs.button.success();
//         this.setState({success: true});
//         this.timeout = setTimeout(() => {
//           this.setState({success: false});
//           this.props.clearCard();
//           if (this.props.transition) {
//             this.props.transition();
//           }
//         }, 2000)
//       } 
//     }

//     if (_.get(this.props, 'newCard.serverResponse.error') !== _.get(nextProps, 'newCard.serverResponse.error') && _.get(nextProps, 'newCard.serverResponse.error')) {
//       if (this.refs.button) {
//         this.refs.button.error();
//       } 
//     }
//   },

//   render() {
//     const creditCardNumber = _.get(this.props.newCard.card, CREDIT_CARD, '');
//     const expirationDate = _.get(this.props.newCard.card, EXPIRATION_DATE, '');
//     const securityCode = _.get(this.props.newCard.card, SECURITY_CODE, '');
//     const creditCardType = payform.parseCardType(creditCardNumber.value);
//     const error = _.get(this.props, 'newCard.serverResponse.error');

//     return (
//       <form ref='creditCardForm' className={`payment-method-form ${this.props.className}`} onSubmit={this.submitCreditCard}>
//         <View>
//           <input type="tel"
//             onBlur={this.onInputBlur.bind(null, CREDIT_CARD)}
//             ref={CREDIT_CARD}
//             id={CREDIT_CARD}
//             placeholder="Credit card number"
//             value={creditCardNumber.value || ''}
//             onChange={this.onChange.bind(null, CREDIT_CARD)}
//             required />
//         </View>

//         <View>
//           <input type="tel"
//             onBlur={this.onInputBlur.bind(null, EXPIRATION_DATE)}
//             ref={EXPIRATION_DATE}
//             placeholder="Expiration Date"
//             id={EXPIRATION_DATE}
//             value={expirationDate.value || ''}
//             onChange={this.onChange.bind(null, EXPIRATION_DATE)}
//             required />
       
//           <input type="tel"
//             onBlur={this.onInputBlur.bind(null, SECURITY_CODE)}
//             ref={SECURITY_CODE}
//             placeholder="Security Code"
//             id={SECURITY_CODE}
//             value={securityCode.value || ''}
//             onChange={this.onChange.bind(null, SECURITY_CODE)}
//             required />
//         </View>
//         {
//           error ? 
//           <Text className="error">There was an error with your payment method</Text> : null
//         }
        
//         <View>
//           <View>
//             {
//               this.props.loading ? 
//               <Text>LOADING</Text> :
//               this.props.buttonText || <Text>Register</Text>
//             }
//           </View>
//         </View>
//       </form>
//     );
//   },

//   submitCreditCard(e) {
//     e.preventDefault();
//     if (this.state.success === true) {
//       return;
//     }
//     const newCard = this.props.newCard.card;
//     const expire = payform.parseCardExpiry(newCard[EXPIRATION_DATE].value);
//     const card = {
//       number: newCard[CREDIT_CARD].value.replace(/ /g, ''),
//       cvc: newCard[SECURITY_CODE].value,
//       exp_month: expire.month,
//       exp_year: expire.year
//     }
//     this.props.submitPaymentMethod(card);
//   },

//   onInputBlur(type) {
//     const state = _.cloneDeep(this.props.newCard.card);
//     _.assign(state[type], {dirty: true});
//     setCreditCardValue([type], state[type]);
//   },

//   onChange(type, e) {
//     const value = e.currentTarget.value;
//     const state = _.cloneDeep(this.props.newCard.card);
//     const obj = state[type] || {};
//     _.assign(obj, {value: value});
//     setCreditCardValue(type, obj);
//   },

  
//   validateForm(card) {
//     const creditCard = card[CREDIT_CARD] ? this.validateCreditCard(card) : false
//     const expiration = card[EXPIRATION_DATE] ? this.validExpiration(card) : false
//     const cvc = card[SECURITY_CODE] ? this.validCVC(card) : false;
//     this.setState({
//       formComplete: creditCard && expiration && cvc
//     });
//   },

//   validateCreditCard(card) {
//     const valid = payform.validateCardNumber(card[CREDIT_CARD].value);
//     this.setInputValidation(CREDIT_CARD, valid, card);
//     return valid;
//   },

//   validExpiration(card) {
//     const expirationValue = payform.parseCardExpiry(card[EXPIRATION_DATE].value);
//     const valid = payform.validateCardExpiry(expirationValue.month, expirationValue.year);
//     this.setInputValidation(EXPIRATION_DATE, valid, card);
//     return valid;
//   },

//   validCVC(card) {
//     const valid = payform.validateCardCVC(card[SECURITY_CODE].value);
//     this.setInputValidation(SECURITY_CODE, valid, card);
//     return valid;
//   },

//   setInputValidation(type, valid, card) {
//     const state = _.cloneDeep(card);
//     if (state[type].error !== !valid) {
//       _.assign(state[type], {error: !valid});
//       setCreditCardValue([type], state[type]);
//     }
//   },

//   componentWillUnmount() {
//     clearTimeout(this.timeout);
//   },

// });

// export default branch(PaymentMethodForm, {
//   cursors: {
//     newCard: ['newPaymentMethod']
//   }
// });
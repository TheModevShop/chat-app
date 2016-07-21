import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash'
import FixedButton from '../FixedButton/FixedButton'
import determineCreditCardBrand from '../../utility/determineCreditCardBrand'
import * as actions from '../../actions/PaymentMethodActions';
import creditcardutils from 'creditcardutils';
import dismissKeyboard from 'dismissKeyboard';

import * as constants from '../../styles/styleConstants';

const NAME_ON_CARD = 'name';
const CREDIT_CARD = 'cc';
const EXPIRATION_DATE = 'date';
const SECURITY_CODE = 'cvc';


class PaymentMethodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {
        cc: '',
        date: '',
        cvv: ''
      }
    };
  }

  componentWillMount() {
    this.creditCardBrand('')
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.paymentMethod, this.props.paymentMethod)) {
      this.validateForm(nextProps.paymentMethod);
    }
  }

  render() {
    const values = this.props.paymentMethod || {};
    const nameInputError = _.get(values, 'name.error') && _.get(values, 'name.dirty') ? styles.inputError : {};
    const ccInputError = _.get(values, 'cc.error') && _.get(values, 'cc.dirty') ? styles.inputError : {};
    const dateInputError = _.get(values, 'date.error') && _.get(values, 'date.dirty') ? styles.inputError : {};
    const cvcInputError = _.get(values, 'cvc.error') && _.get(values, 'cvc.dirty') ? styles.inputError : {};
    return (
      <View style={{marginTop: 20, flex: 1}}>
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={(c) => this.name = c}
              onFocus={this.onInputFocus.bind(this, 'name')}
              placeholder="Name on Card"
              style={[styles.textInput, nameInputError]}
              onChangeText={this.updateInput.bind(this, 'name')}
              onBlur={this.onInputBlur.bind(this, 'name')}
              value={_.get(values, 'name.value')}
              returnKeyType = {"next"}
              onSubmitEditing={(event) => { 
                this.cc.focus(); 
              }} />
          </View>

          <View style={styles.inputWrapper}>
            <Image resizeMode='contain' style={{position: 'absolute', 'left': 10, 'top': 21, width: 28, height: 18}} source={{uri: _.get(this.state, 'brand.image')}} />
            <TextInput
              ref={(c) => this.cc = c}
              onFocus={this.onInputFocus.bind(this, 'cc')}
              placeholder="Credit Card Number"
              keyboardType="number-pad"
              style={[styles.textInput, ccInputError, {paddingLeft: 50}]}
              onChangeText={this.updateInput.bind(this, 'cc')}
              onBlur={this.onInputBlur.bind(this, 'cc')}
              value={_.get(values, 'cc.value')} />
          </View>

          <View style={[styles.inputGroup]}>
            <View style={[styles.inputWrapper, {marginRight: 10}]}>
              <TextInput
                ref={(c) => this.date = c}
                onFocus={this.onInputFocus.bind(this, 'date')}
                placeholder="Date"
                keyboardType="number-pad"
                style={[styles.textInput, dateInputError]}
                onChangeText={this.updateInput.bind(this, 'date')}
                onBlur={this.onInputBlur.bind(this, 'date')}
                value={_.get(values, 'date.value')} />
            </View>
            <View style={[styles.inputWrapper]}>
              <TextInput
                ref={(c) => this.cvc = c}
                onFocus={this.onInputFocus.bind(this, 'cvc')}
                placeholder="cvc"
                maxLength={4}
                keyboardType="number-pad"
                style={[styles.textInput, cvcInputError]}
                onChangeText={this.updateInput.bind(this, 'cvc')}
                onBlur={this.onInputBlur.bind(this, 'cvc')}
                value={_.get(values, 'cvc.value')} />
            </View>
          </View>
        </View>
        
          {
            _.get(this.props, 'paymentMethods.length') ?
            <View>
            <View style={[styles.inputWrapper, {paddingHorizontal: constants.PADDING_STANDARD, marginTop: constants.PADDING_LARGE, flex: 1, flexDirection: 'row', justifyContent: 'space-between', 'alignItems': 'center'}]}>
              <Text>Make default payment</Text>
              <Switch
                onTintColor={constants.DARKBLUE}
                onValueChange={this.updateInput.bind(this, 'default', !_.get(values, 'default.value'))}
                value={_.get(values, 'default.value')} />
            </View></View> : null
          }

        
        {
          this.state.formComplete ?
          <FixedButton style={{backgroundColor: constants.DARKBLUE}} onScreen={true} title={'Add Payment Method'} onPress={this.submit.bind(this)} /> : null
        }
     
      </View>
    );
  }

  updateInput(key, val) {
    const card = _.cloneDeep(this.props.paymentMethod);
    const obj = card[key] || {};

    if (key === 'cc') {
      val = creditcardutils.formatCardNumber(val);
      this.creditCardBrand(val)
    } else if(key === 'date') {
      val = creditcardutils.formatCardExpiry(val);
    }
    _.assign(obj, {value: val});
    actions.setCardValue(key, obj);
  }

  creditCardBrand(val) {
    const brand = determineCreditCardBrand(creditcardutils.parseCardType(val));
    if (!_.isEqual(brand, this.state.brand)) {
      this.setState({brand})
    } 
  }

  validateForm(card) {
    const name = _.get(card[NAME_ON_CARD], 'value', '').trim();
    const cc = card[CREDIT_CARD] ? this.validateCreditCard(card) : false;
    const date = card[EXPIRATION_DATE] ? this.validExpiration(card) : false;
    const cvc = card[SECURITY_CODE] ? this.validCVC(card) : false;
    const formComplete = name && cc && date && cvc;
    if (formComplete ) {
      dismissKeyboard();
    }
    this.setState({
      formComplete: name && cc && date && cvc
    }, () => {
      this.setFocusStatesAfterValidation({name, cc, date, cvc})
    });
  }

  validateCreditCard(card) {
    const valid = creditcardutils.validateCardNumber(card[CREDIT_CARD].value);
    this.setInputValidation(CREDIT_CARD, valid, card);
    return valid;
  }

  validExpiration(card) {
    const expirationValue = creditcardutils.parseCardExpiry(card[EXPIRATION_DATE].value);
    const valid = creditcardutils.validateCardExpiry(expirationValue.month, expirationValue.year);
    this.setInputValidation(EXPIRATION_DATE, valid, card);
    return valid;
  }

  validCVC(card) {
    const valid = creditcardutils.validateCardCVC(card[SECURITY_CODE].value, card[CREDIT_CARD].value);
    this.setInputValidation(SECURITY_CODE, valid, card);
    return valid;
  }

  setInputValidation(key, valid, card) {
    const state = _.cloneDeep(card);
    if (state[key].error !== !valid) {
      _.assign(state[key], {error: !valid});
      actions.setCardValue(key, state[key]);
    }
  }

  setFocusStatesAfterValidation({name, cc, date, cvc}) {
    const currentFocus = this.state.currentFocus || '';
    if (currentFocus === 'cc' && cc) {
      this.date.focus();
    } else if(currentFocus === 'date' && date) {
      this.cvc.focus();
    }
  }

  onInputBlur(key) {
    const state = _.cloneDeep(this.props.paymentMethod);
    _.assign(state[key], {dirty: true});
    actions.setCardValue(key, state[key]);
  }

  onInputFocus(field) {
    this.setState({currentFocus: field})
  }

  
  submit() {
    const newCard = this.props.paymentMethod;
    const expire = creditcardutils.parseCardExpiry(newCard[EXPIRATION_DATE].value);
    const card = {
      name: newCard[NAME_ON_CARD].value,
      number: newCard[CREDIT_CARD].value.replace(/ /g, ''),
      cvc: newCard[SECURITY_CODE].value,
      exp_month: expire.month,
      exp_year: expire.year
    }
    this.props.submitPaymentMethod(card);
  }
}

const styles = StyleSheet.create({
  formWrapper: {

  },
  textInput: {
    fontSize: 16, 
    paddingLeft: constants.SPACE_STANDARD, 
    flex: 1, 
    height: constants.ROW_HEIGHT,
  },
  inputGroup: {
    flex:1,
    flexDirection: 'row',
    height: constants.ROW_HEIGHT,
  },
  inputWrapper: {
    flex:1, 
    borderBottomWidth: 1, 
    borderBottomColor: constants.COLOR_MERCURY,
    height: constants.ROW_HEIGHT,
    position: 'relative',
    backgroundColor: '#fff'
  },
  inputError: {
    color: 'red'
  }
})

export default PaymentMethodForm;
'use strict';
import _ from 'lodash';
import addStripeCard from '../../utility/stripe'
import {submitIdentityVerification} from '../../actions/IdentityVerificationActions';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';

import NavBar from '../../components/NavBar/NavBar';
import * as constants from '../../styles/styleConstants';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';


import IdentityVerificationForm from '../../components/Forms/IdentityVerificationForm';

class AddStripeVerificationData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: constants.NAV_HEIGHT}}>
         <IdentityVerificationForm
          submit={this.submit.bind(this)}/>
        </View>
        <NavBar title={'Add Identity Verification'} leftAction={this.props.goBack.bind(this)}  />
      </View>
    );
  }
  
  async submitPaymentMethod(data) {
    submitIdentityVerification(data);
  }

  submit() {

  }
}

export default branch(AddStripeVerificationData, {
  cursors: {
    identityVerification: ['identityVerification']
  }
});
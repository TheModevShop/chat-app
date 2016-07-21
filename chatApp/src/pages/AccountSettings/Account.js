'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow'
import NavBar from '../../components/NavBar/NavBar';

// Styles
import * as constants from '../../styles/styleConstants';
import text from '../../styles/textStyle';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const userId = _.get(this.props.user, 'details.facebookCredentials.userId');
    return (
      <View style={{flex: 1, margin: 0}}>
        <View style={{flex: 1, marginTop: constants.NAV_HEIGHT}}>
          <View style={{paddingHorizontal: constants.PADDING_STANDARD, marginVertical: constants.PADDING_STANDARD}}>
            <Text style={text.h1}>Good Morning, <Text style={[text.bold]}>{_.get(this.props.user, 'details.name.first')}</Text></Text>
          </View> 

          <FullTappableRow title={'Add Payment Method'} onPress={this.props.onNavigation.bind(this, { type: 'push', key: 'AddPaymentMethod' })} />
          
          {this.sectionHeader('Account')}
          <FullTappableRow title={`Password`} />
          <FullTappableRow title={'email'} />
          <FullTappableRow title={'zipcode'} bottomBorder={false} />
        </View>
        <NavBar title={'Account'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  sectionHeader(title) {
    return (
      <View style={{marginTop: 16, paddingLeft: 16, paddingBottom: 8}}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12
  }
})

export default branch(Account, {
   cursors: {
    user: ['user']
  }
});
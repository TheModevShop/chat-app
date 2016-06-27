'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import creditcardutils from 'creditcardutils';
import * as Anima from 'react-native-animatable';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';


class Settings extends Component {
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

  render() {
    return (
      <View style={{flex: 1, margin: 20}}>
        <View>
          <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
            <TextInput
              placeholder="Name on Card"
              style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
              onChangeText={this.updateInput.bind(this, 'name')}
              value={this.state.card.name} />
          </View>
          <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
            <TextInput
              placeholder="Credit Card Number"
              style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
              onChangeText={this.updateInput.bind(this, 'cc')}
              value={this.state.card.cc} />
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc', marginRight: 10}}>
              <TextInput
                placeholder="Date"
                style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
                onChangeText={this.updateInput.bind(this, 'date')}
                value={this.state.card.date} />
            </View>
            <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc', marginLeft: 10}}>
              <TextInput
                placeholder="CVC"
                maxLength={4}
                style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
                onChangeText={this.updateInput.bind(this, 'cvv')}
                value={this.state.card.cvv} />
            </View>
          </View>

          <TouchableHighlight underlayColor='#ccc' onPress={this.submit.bind(this)} style={{flex:1, backgroundColor: '#ccc', marginTop: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Submit</Text>
          </TouchableHighlight>
        </View>
       
      </View>
    );
  }
  updateInput(type, val) {
    const card = _.cloneDeep(this.state.card);
    if (type === 'cc') {
      val = creditcardutils.formatCardNumber(val);
    } else if(type === 'date') {
      val = creditcardutils.formatCardExpiry(val)
    }
    card[type] = val;
    this.setState({card});
  }
  submit() {

  }
}

export default branch(Settings, {
});
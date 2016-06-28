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
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {
        email: '',
        firstName: '',
        lastName: ''
      }
    };
  }

  render() {
    const userId = _.get(this.props.user, 'details.facebookCredentials.userId');
    return (
      <View style={{flex: 1, margin: 0}}> 
        <View style={{height: 150, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{overflow: 'hidden', position: 'relative', borderWidth: 3, borderColor: '#fff', borderRadius: 100, backgroundColor: '#999', height: 90, width: 90}}>
          <Image style={{height: 90, width: 90, position: 'absolute'}} source={{uri: `https://graph.facebook.com/${userId}/picture?width=100&height=100`}}/>
          </View>
        </View>
        <View style={{margin: 20}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc', marginRight: 10}}>
              <TextInput
                placeholder="First Name"
                style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
                onChangeText={this.updateInput.bind(this, 'firstName')}
                value={this.state.card.date} />
            </View>
            <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc', marginLeft: 10}}>
              <TextInput
                placeholder="Last Name"
                maxLength={4}
                style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
                onChangeText={this.updateInput.bind(this, 'lastName')}
                value={this.state.card.cvv} />
            </View>
          </View>
          <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
            <TextInput
              placeholder="Email"
              style={{fontSize: 16, paddingLeft: 5, flex: 1, height: 50}}
              onChangeText={this.updateInput.bind(this, 'name')}
              value={this.state.card.name} />
          </View>

          <TouchableHighlight underlayColor='#ccc' onPress={this.ss.bind(this)} style={{flex:1, backgroundColor: '#ccc', marginTop: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Submit</Text>
          </TouchableHighlight>
        </View>
       
      </View>
    );
  }
  updateInput(type, val) {
    const card = _.cloneDeep(this.state.card);
    card[type] = val;
    this.setState({card});
  }
  ss() {

  }
}

export default branch(Settings, {
   cursors: {
    user: ['user']
  }
});
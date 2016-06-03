'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View
} from 'react-native';

class Home extends Component {
  render() {
    const goToPageTwo = () => Actions.login({text: 'Hello World!'}); 
    return (
     <View style={{margin: 128}}>
      <Text onPress={goToPageTwo}>This is PageOne!</Text>
    </View>
    );
  }
}

export default branch(Home, {
  cursors: {
    view: ['home']
  }
});
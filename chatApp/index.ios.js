import React, { Component } from 'react';
import tree from './src/state/StateTree';
import Application from './src/pages/Application/ApplicationTabs';
import {root} from 'baobab-react/higher-order';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


class chatApp extends Component {
  render() {
    return (
      <Application></Application>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


let ComposedComponent = root(chatApp, tree);
AppRegistry.registerComponent('chatApp', () => ComposedComponent);


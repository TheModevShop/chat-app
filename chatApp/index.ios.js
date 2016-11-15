import React, { Component } from 'react';
import tree from './src/state/StateTree';
import Application from './src/pages/Application/Application';
import {root} from 'baobab-react/higher-order';
import OneSignal from 'react-native-onesignal';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var pendingNotifications = [];
function handleNotification (notification) {
}

OneSignal.configure({
    onIdsAvailable: function(device) {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
    },
  onNotificationOpened: function(message, data, isActive) {
      var notification = {message: message, data: data, isActive: isActive};
      console.log('NOTIFICATION OPENED: ', notification);
      //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
      //    console.log('Navigator is null, adding notification to pending list...');
          pendingNotifications.push(notification);
      //    return;
      // }
      handleNotification(notification);
  }
});

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


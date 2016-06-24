'use strict';
import tree from '../../state/StateTree';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator, StyleSheet, StatusBar, Platform, TouchableHighlight} from 'react-native';

import Login from '../Login/Login';
import Initial from '../Initial/Initial';
import Settings from '../Settings/Settings';


import AddSession from '../AddSession/AddSession';
import {checkSession} from '../../actions/AuthenticationActions';
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import TabNavigator from 'react-native-tab-navigator';
import HomeController from './Controllers/HomeController';
import ChatController from './Controllers/ChatController';
import FavoritesController from './Controllers/FavoritesController';
import HistoryController from './Controllers/HistoryController';

let _drawer;
let ADMIN_OPEN = false;
let STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
let ExtraDimensions;
if (Platform.OS === 'android') {
  ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
tree.set('STATUS_BAR_HEIGHT', STATUS_BAR_HEIGHT);
const searchView = tree.select(['searchView']);


class Application extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: 'initial'
    };
  }

   async componentDidMount() {
    const session = await checkSession();
    if (session) {
      setTimeout(() => {
        this.setState({selectedTab: 'home'})
      }, 800)
    } else {
      this.setState({selectedTab: 'login'})
    }
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
      <Drawer
        ref={(ref) => _drawer = ref}
        type="overlay"
        side="right"
        content={DrawerContent(this)}
        openDrawerOffset={0.5} // 20% gap on the right side of drawer
        panCloseMask={0.5}
        onOpen={this.drawerOpen.bind(this)}
        onClose={this.drawerClose.bind(this)}
        captureGestures={true}
        closedDrawerOffset={-3}
        tweenDuration={120}
        styles={{drawer: {shadowColor: '#000000', shadowOpacity: 0.2, shadowRadius: 3}}}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2}
        })}>
        <StatusBar showHideTransition={'fade'} animated={true} backgroundColor="#fff" barStyle="default" hidden={this.state.hidden}/>
        <View style={{flex: 1, backgroundColor: 'rgb(251, 251, 251)', marginTop: STATUS_BAR_HEIGHT}}>
          {
            this.state.selectedTab === 'settings' ? 
            <Settings /> :
            this.state.selectedTab === 'initial' ?
            <Initial /> :
            this.state.selectedTab === 'login' ?
            <Login /> :
            this.renderTabs()
          }
        </View>
      </Drawer>
      </View>

    );
  }

  drawerOpen() {}
  drawerClose() {}

  renderTabs() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          renderIcon={() => <Icon name={'ios-analytics-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-analytics'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <HomeController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'chat'}
          renderIcon={() => <Icon name={'ios-text-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-text'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'chat' })}>
          <ChatController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'favorites'}
          renderIcon={() => <Icon name={'ios-star-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-star'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'favorites' })}>
          <FavoritesController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'history'}
          renderIcon={() => <Icon name={'ios-recording-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-recording'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <HistoryController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.drawerOpen}
          renderIcon={() => <Icon name={'ios-options-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-options'} size={25} color="#999" />}
          badgeText=""
          onPress={() => openDrawer()}>
            <View></View>
          </TabNavigator.Item>
      </TabNavigator>
    );
  }
}


function DrawerContent(self) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'}}>
        <View style={{backgroundColor: '#ccc'}}>
          
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableHighlight onPress={() => onDrawerLinks(!ADMIN_OPEN ? Actions.admin : Actions.home, 'admin')} underlayColor='#99d9f4'>
            <Text style={{padding: 20}}>{!ADMIN_OPEN ? 'Switch to Admin' : 'Switch to User'}</Text>
          </TouchableHighlight>
        </View>
      </View>
  );
}


function onDrawerLinks(link, admin) {
   _drawer.close();
   setTimeout(() => {
    link();
    if (admin) {
      ADMIN_OPEN = !ADMIN_OPEN;
     }
   }, 300);
}

function openDrawer() {
  _drawer.open();
}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
})

export default branch(Application, {
  cursors: {
    authentication: ['authentication', 'sessionData']
  }
});
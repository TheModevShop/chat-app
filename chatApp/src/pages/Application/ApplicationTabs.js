'use strict';
import tree from '../../state/StateTree';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, Image, View, Navigator, StyleSheet, StatusBar, Platform, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import TabNavigator from 'react-native-tab-navigator';
import HomeController from './Controllers/HomeController';
import ChatController from './Controllers/ChatController';
import FavoritesController from './Controllers/FavoritesController';
import HistoryController from './Controllers/HistoryController';
import ListingsController from './Controllers/ListingsController';
import InstructorScheduleController from './Controllers/InstructorScheduleController';
import TeachAClassController from './Controllers/TeachAClassController';

//VIEWS
import AddService from '../AddService/AddService';
import AddSession from '../AddSession/AddSession';

// EXTRAS
import Modal from '../../components/Modal/Modal';

// CONSTANTS
import * as styleConstants from '../../styles/styleConstants';


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
      selectedTab: 'home'
    };
  }

  selectTab(tab) {
    this.setState({ selectedTab: 'tab' })
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Drawer
          ref={(ref) => _drawer = ref}
          type="overlay"
          side="right"
          content={this.DrawerContent(this)}
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

          <StatusBar animated={true} showHideTransition={'fade'} animated={true} backgroundColor="white" barStyle="default" hidden={this.state.hidden}/>
          <View style={{flex: 1, backgroundColor: styleConstants.SILVER, marginTop: this.state.selectedTab === 'TODO' ? STATUS_BAR_HEIGHT : 0 }}>
            {
              this.state.instructor ? 
              this.renderInstructorTabs() :
              this.renderTabs()
            }
          </View>

        </Drawer>
        <Modal />
      </View>

    );
  }

  drawerOpen() {}
  drawerClose() {
    StatusBar.setHidden(false, 'fade');
  }

  renderTabs() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          renderIcon={() => <Icon name={'ios-analytics-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-analytics'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <HomeController onNavigation={this.props.onNavigation.bind(this)}/>
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
          onPress={() => this.setState({ selectedTab: 'history' })}>
          <HistoryController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.drawerOpen}
          renderIcon={() => <Icon name={'ios-options-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-options'} size={25} color="#999" />}
          badgeText=""
          onPress={this.openDrawer.bind(this)}>
            <View></View>
          </TabNavigator.Item>
      </TabNavigator>
    );
  }


  renderInstructorTabs() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'instructor-home'}
          renderIcon={() => <Icon name={'ios-analytics-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-analytics'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'instructor-home' })}>
          <InstructorScheduleController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'listings'}
          renderIcon={() => <Icon name={'ios-analytics-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-analytics'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'listings' })}>
          <ListingsController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'add-listings'}
          renderIcon={() => <Icon name={'ios-analytics-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-analytics'} size={25} color="#999" />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'add-listings' })}>
          <TeachAClassController />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.drawerOpen}
          renderIcon={() => <Icon name={'ios-options-outline'} size={25} color="#999" />}
          renderSelectedIcon={() => <Icon name={'ios-options'} size={25} color="#999" />}
          badgeText=""
          onPress={this.openDrawer.bind(this)}>
            <View></View>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

  DrawerContent(self) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'}}>
        <View style={drawerStyles.content}>
          <Image style={drawerStyles.image} source={{uri: `https://graph.facebook.com/${_.get(this.props, 'user.details.facebook_user_id')}/picture?width=200&height=200`}}/>
          <TouchableHighlight style={drawerStyles.drawerLink} onPress={() => this.onDrawerLinks('account-settings', null)} underlayColor='#99d9f4'><Text style={drawerStyles.drawerLinkText}>Account Settings</Text></TouchableHighlight>
          <TouchableHighlight style={drawerStyles.drawerLink} onPress={() => this.onDrawerLinks('teach-a-class', null)} underlayColor='#99d9f4'><Text style={drawerStyles.drawerLinkText}>Teach a Class</Text></TouchableHighlight>
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableHighlight onPress={() => this.onDrawerLinks(!ADMIN_OPEN ? 'admin' : 'home', 'admin')} underlayColor='#99d9f4'>
            <Text style={{padding: 20}}>{!ADMIN_OPEN ? 'Switch to Admin' : 'Switch to User'}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  } 

  onDrawerLinks(link, admin) {
     _drawer.close();
     setTimeout(() => {
      if (admin === 'admin') {
        ADMIN_OPEN = !ADMIN_OPEN;
        this.setState({instructor: !this.state.instructor, selectedTab: ADMIN_OPEN ? 'instructor-home' : 'home' });
      } else if (link === 'account-settings') {
        this.props.onNavigation({ type: 'push', key: 'AccountSettings' })
      } else if (link === 'teach-a-class') {
        this.props.onNavigation({ type: 'push', key: 'TeachAClass' })
      } else {
        this.setState({selectedTab: link});
      }
     }, 300);
  }

   openDrawer() {
    StatusBar.setHidden(true, 'slide');
    _drawer.open();
  }

}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
  drawerLink: {
    borderBottomWidth: 1,
    borderBottomColor: styleConstants.SILVER,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: styleConstants.PADDING_STANDARD,
    paddingBottom: styleConstants.PADDING_STANDARD,
    maxHeight: 60,
    flexDirection: "row",
  },
  drawerLinkText: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: styleConstants.PADDING_STANDARD
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 50
  },
  image: {
    height: 60, 
    width: 60,
    marginBottom: 20,

  },

})

export default branch(Application, {
  cursors: {
    authentication: ['authentication', 'sessionData'],
    user: ['user'],
  }
});
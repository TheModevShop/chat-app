'use strict';
import tree from '../../state/StateTree';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator, StyleSheet, StatusBar, Platform, TouchableHighlight} from 'react-native';
import {Actions, Scene, Router, Tab, TabView, Reducer} from 'react-native-router-flux';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import Initial from '../Initial/Initial';
import Conversations from '../Conversations/Conversations';
import Search from '../Search/Search';
import SessionDetails from '../SessionDetails/SessionDetails';
import AddSession from '../AddSession/AddSession';
import {checkSession} from '../../actions/AuthenticationActions';
import DrawerLayout from 'react-native-drawer-layout';
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import TabBar from './TabBar';

let STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
let ExtraDimensions;
if (Platform.OS === 'android') {
  ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
tree.set('STATUS_BAR_HEIGHT', STATUS_BAR_HEIGHT);

const searchView = tree.select(['searchView']);
let _drawer;

class DrawerIcon extends React.Component {
  render(){
    const selected = this.props.selected;
    return (
        <Icon name={selected ? 'ios-options' : 'ios-options-outline'} size={30} color="#999" />
    );
  }
}

class ChatIcon extends React.Component {
  render(){
    const selected = this.props.selected;
    return (
        <Icon name={selected ? 'ios-text' : 'ios-text-outline'} size={30} color="#999" />
    );
  }
}

class SessionIcon extends React.Component {
  render(){
    const selected = this.props.selected;
    return (
        <Icon name={selected ? "ios-analytics" : "ios-analytics-outline"} size={28} color="#999" />
    );
  }
}

class StarIcon extends React.Component {
  render(){
    const selected = this.props.selected;
    return (
        <Icon name={selected ? "ios-star" : "ios-star-outline"} size={30} color="#999" />
    );
  }
}
class HistoryIcon extends React.Component {
  render(){
    const selected = this.props.selected;
    return (
        <Icon name={selected ? 'ios-recording' : "ios-recording-outline"} size={30} color="#999" />
    );
  }
}

function DrawerContent() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'}}>
        <View style={{backgroundColor: '#ccc'}}>
          
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableHighlight onPress={() => onDrawerLinks(Actions.admin)} underlayColor='#99d9f4'>
            <Text style={{padding: 20}}>Login or Sign up</Text>
          </TouchableHighlight>
        </View>
      </View>
  );
}

function onDrawerLinks(link) {
   _drawer.close();
   setTimeout(() => {
    Actions.admin();
   }, 300);
}

function sc(d) {
  return (
    <Scene key={`home`} component={TabBar} tabs={true} duration={d === 1 ? null : 0}>
        <Scene key="sessions" initial={true} title="session" icon={SessionIcon}>
            <Scene key="sessionsList" hideNavBar={true} component={Home} title="Tab #1_1" />
            <Scene key="sessionDetails" hideNavBar={false} component={SessionDetails} title="Tab #1_2"/>
        </Scene>
        <Scene key="chat" title="chat" leftButtonImage={''} icon={ChatIcon}>
            <Scene key="conversations" initial={true}  component={Conversations} title="All Convs" />
            <Scene key="conversation" component={Chat} title="Conversation" />
        </Scene>
        <Scene key="favorites" title="favorites" icon={StarIcon}>
            <Scene key="conversations" initial={true}  component={Conversations} title="All Convs" />
            <Scene key="conversation" component={Chat} title="Conversation" />
        </Scene>
        <Scene key="history" title="history" icon={HistoryIcon}>
            <Scene key="conversations" initial={true}  component={Conversations} title="All Convs" />
            <Scene key="conversation" component={Chat} title="Conversation" />
        </Scene>
        <Scene key="tab3" onSelect={openDrawer} component={Conversations} title="Tab #3" icon={DrawerIcon}/>
    </Scene>
  )
}

function adminViews(d) {
  return (
    <Scene key={`admin`} component={TabBar} tabs={true} duration={0}>
        <Scene key="addSession" initial={true} title="session" icon={SessionIcon}>
            <Scene key="addSessionInfo" initial={true} hideNavBar={true} component={AddSession} title="Tab #1_1" />
        </Scene>
        <Scene key="drawer-admin" onSelect={openDrawer} component={Conversations} title="drawer-admin" icon={DrawerIcon}/>
    </Scene>
  )
}

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} direction="vertical" title="Login" hideNavBar={true}/>
    <Scene key="initial" component={Initial} title="Initial" initial={true} hideNavBar={true}/>
    {sc(0)}
    {adminViews()}
  </Scene>
);

function openDrawer() {
  _drawer.open();
}


class Application extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  
   async componentDidMount() {
    searchView.on('update', (e) => {
      if (e.target.get().open) {
        this.setState({tabsHidden: true});
      } else {
        this.setState({tabsHidden: false});
      }
    });
    try {
      const session = await checkSession();
      setTimeout(() => {
        Actions.home();
      }, 800)
    } catch (err) {
      Actions.login();
    }
  }

  render() {
    const app = <View style={{flex: 1, backgroundColor: '#fff'}}><Text>Hello</Text></View>;
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
      <Drawer
        ref={(ref) => _drawer = ref}
        type="overlay"
        side="right"
        content={DrawerContent()}
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
        <View style={{flex: 1, marginTop: STATUS_BAR_HEIGHT}}>
          <Router navigationBarStyle={{padding: 0, height: 50, backgroundColor: 'rgba(0,0,0,0.2)'}} drawerImage={''} scenes={scenes}/>
        </View>
      </Drawer>
      </View>
    );
  }
  drawerOpen() {
   this.setState({hidden: true});
  }
  drawerClose() {
   this.setState({hidden: false});
  }
}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
})

export default Application;
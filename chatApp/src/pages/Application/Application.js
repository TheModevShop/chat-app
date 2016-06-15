'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator, StyleSheet, StatusBar} from 'react-native';
import {Actions, Scene, Router, Tab, TabView, Reducer} from 'react-native-router-flux';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import Conversations from '../Conversations/Conversations';
import Search from '../Search/Search';
import SessionDetails from '../SessionDetails/SessionDetails';
import {checkSession} from '../../actions/AuthenticationActions';
import DrawerLayout from 'react-native-drawer-layout';
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import TabBar from './TabBar';

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


const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" initial={true} hideNavBar={true}/>
    <Scene key="home" component={TabBar} tabs={true} >
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
    try {
      const session = await checkSession();
      console.log(session);
    } catch (err) {
      console.log(session);
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
        content={app}
        openDrawerOffset={0.5} // 20% gap on the right side of drawer
        panCloseMask={0.9}
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
        <Router drawerImage={''} scenes={scenes}/>
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
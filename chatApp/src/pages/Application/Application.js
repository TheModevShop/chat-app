'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator, StyleSheet} from 'react-native';
import {Actions, Scene, Router, TabBar, Tab, TabView, Reducer} from 'react-native-router-flux';
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
import Tabs from 'react-native-tabs';

let _drawer;

class DrawerIcon extends React.Component {
  render(){
    return (
        <Icon name="ios-options-outline" size={30} color="#900" />
    );
  }
}

class ChatIcon extends React.Component {
  render(){
    return (
        <Icon name="ios-text-outline" size={30} color="#900" />
    );
  }
}

class SessionIcon extends React.Component {
  render(){
    return (
        <Icon name="ios-analytics" size={28} color="#900" />
    );
  }
}

class StarIcon extends React.Component {
  render(){
    return (
        <Icon name="ios-star-outline" size={30} color="#900" />
    );
  }
}
class HistoryIcon extends React.Component {
  render(){
    return (
        <Icon name="ios-recording-outline" size={30} color="#900" />
    );
  }
}


class TabsBar extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Tabs style={{backgroundColor:'white', position: 'absolute', bottom: 0, left: 0, right: 0}}
      selectedStyle={{color:'red'}} onSelect={this.setPage.bind(this)}>
      <Text name="sessions">Session</Text>
      <Text name="chat" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Chat</Text>
      <Text name="third">NA</Text>
      <Text name="fourth" selectedStyle={{color:'green'}}>NA</Text>
      <Text name="drawer">Drawer</Text>
    </Tabs>
    );
  }
}


const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" initial={true} hideNavBar={true}/>
    <Scene key="home" tabs={true} >
        <Scene key="sessions" initial={true} title="session" icon={SessionIcon}>
            <Scene key="sessionsList" hideNavBar={true} component={Home} title="Tab #1_1" />
            <Scene key="sessionDetails" hideNavBar={false} component={SessionDetails} title="Tab #1_2"/>
        </Scene>
        <Scene key="chat" title="chat" icon={ChatIcon}>
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
        <Scene key="tab3" component={Conversations} title="Tab #3" icon={DrawerIcon}/>
    </Scene>
  </Scene>


);

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
      if (action.scene && action.scene.name === 'tab3') {
        _drawer.open();
         console.log("ACTION:", action);
      }
        return defaultReducer(state, action);
    }
};

class Application extends React.Component {
  
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
        captureGestures={true}
        closedDrawerOffset={-3}
        tweenDuration={120}
        styles={{drawer: {shadowColor: '#000000', shadowOpacity: 0.2, shadowRadius: 3}}}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2}
        })}>
        <Router createReducer={reducerCreate} scenes={scenes}/>
      </Drawer>
      </View>
    );
  }
  setPage(el) {
    return true
  }
}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
})

export default Application;
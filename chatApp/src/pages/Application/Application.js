'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator} from 'react-native';
import {Actions, Scene, Router, TabBar} from 'react-native-router-flux';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import Conversations from '../Conversations/Conversations';
import Search from '../Search/Search';
import SessionDetails from '../SessionDetails/SessionDetails';
import {checkSession} from '../../actions/AuthenticationActions';
import DrawerLayout from 'react-native-drawer-layout';



const scenes = Actions.create(
  <Scene key="root" tabs={true}>
    <Scene key="home" component={Home} title="Home" hideNavBar={true}/>
    <Scene key="login" component={Login} title="Login" initial={true} hideNavBar={true}/>
    <Scene key="chat" component={Chat} title="Chat"/>
    <Scene key="conversations" component={Conversations} title="Conversations"/>
    <Scene key="sessionDetails" component={SessionDetails} title="Session Details" hideNavBar={false}/>
    <Scene key="search" direction="vertical" component={Search} title="Search" hideNavBar={true}/>
  </Scene>
);

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
      <DrawerLayout
        drawerWidth={200}
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => app}>

        <Router scenes={scenes}/>
      </DrawerLayout>
    );
  }
}

export default Application;
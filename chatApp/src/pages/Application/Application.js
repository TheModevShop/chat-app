'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View, Navigator} from 'react-native';
import {Actions, Scene, Router, TabBar, Tab} from 'react-native-router-flux';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import Conversations from '../Conversations/Conversations';
import Search from '../Search/Search';
import SessionDetails from '../SessionDetails/SessionDetails';
import {checkSession} from '../../actions/AuthenticationActions';
import DrawerLayout from 'react-native-drawer-layout';
import Tabs from 'react-native-tabs';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" initial={true} hideNavBar={true}/>
    <Scene key="sessions" title="Sessions">
        <Scene initial={true}  key="home_1" component={Home} title="Home" hideNavBar={true}/>
        <Scene key="sessionDetails" component={SessionDetails} title="Session Details" hideNavBar={false}/>
      </Scene>
      <Scene key="chatsection" title="Chat">
        <Scene key="chat" component={Chat} title="Chat"/>
        <Scene initial={true} key="conversations" component={Conversations} title="Conversations"/>
      </Scene>
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
        <View style={{flex: 1}}>
          <Router scenes={scenes}/>
          <Tabs style={{backgroundColor:'white', position: 'absolute', bottom: 0, left: 0, right: 0}}
              selectedStyle={{color:'red'}} onSelect={this.setPage.bind(this)}>
            <Text name="sessions">First</Text>
            <Text name="chat" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth" selectedStyle={{color:'green'}}>Fourth</Text>
            <Text name="fifth">Fifth</Text>
          </Tabs>
        </View>
      </DrawerLayout>
    );
  }
  setPage(el) {
    Actions.chatsection()
  }
}

export default Application;
'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {Text, View} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="Home"/>
    <Scene key="login" component={Login} title="Login" initial={true}/>
    <Scene key="chat" component={Chat} title="Chat"/>
  </Scene>
);

class Application extends React.Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

export default Application;
'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {openChat} from '../../actions/ChatActions'
import _ from 'lodash';
import {
  Text,
  View,
  ListView
} from 'react-native';

class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const users = _.get(props, 'users', []);
    if (users.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(users),
      });
    }
  }

  render() {
    const goToPageTwo = () => Actions.conversations({text: 'Hello World!'});
    return (
      this.state.dataSource ?
       <ListView
        style={{marginTop: 128}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text onPress={this.goToChat.bind(this, rowData)}>{rowData.name.first + ' ' +rowData.name.last}</Text>}        
      /> : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

  goToChat(user) {
    openChat(user);
    Actions.conversations({text: 'Hello World!'})
  }
}

export default branch(Home, {
  cursors: {
    view: ['home'],
    users: ['facets', 'Users']
  }
});
'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {openChat} from '../../actions/ChatActions';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class Conversations extends Component {
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
    const users = _.get(props, 'AllConversations', []);
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
        style={{marginTop: 60, backgroundColor: '#fff'}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return (
            <TouchableHighlight onPress={this.goToChat.bind(this, rowData)} underlayColor='#999'>
            <View style={styles.conversation}>
              <View style={styles.avatar}>
                <Icon name={'md-person'} style={{marginTop: 7}} size={50} color="#999" />
              </View>
              <View style={{flex: 4}}>
                <Text style={styles.title}>{rowData.users[0].name.first + ' and ' +rowData.users[1].name.first}</Text>
                <Text>{_.get(rowData.lastMessage, 'log', '')}</Text>
              </View>
            </View>
            </TouchableHighlight>
          )
        }}        
      /> : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

  goToChat(conversation) {
    openChat(conversation);
    Actions.conversation({text: 'Hello World!'})
  }
  componentWillUnmount() {
    console.log('unmount')
  }
}


let styles = StyleSheet.create({
  conversation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#999'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
    flex: 1
  }
});

export default branch(Conversations, {
  cursors: {
    view: ['home'],
    AllConversations: ['facets','AllConversations'],
    users: ['facets', 'Users']
  }
});
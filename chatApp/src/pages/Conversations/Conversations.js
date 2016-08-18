'use strict';
import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import {branch} from 'baobab-react/higher-order';
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
    if (users.length && !users.$isLoading) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(users),
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 60}}>
        {
          this.state.dataSource ?
         <ListView
          style={{}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            const conversation = _.get(rowData, 'conversation');
            return (
              <TouchableHighlight onPress={this.goToChat.bind(this, rowData)} underlayColor='#999'>
              <View style={styles.conversation}>
                <View style={styles.avatar}>
                  <Icon name={'md-person'} style={{marginTop: 7}} size={50} color="#999" />
                </View>
                <View style={{flex: 4}}>
                  <Text style={styles.title}>{_.get(conversation, 'users[0].user.firstName') + ' and ' +_.get(conversation, 'users[1].user.firstName')}</Text>
                  <Text>{_.get(conversation.lastMessage, 'log', '')}</Text>
                </View>
              </View>
              </TouchableHighlight>
            )
          }}        
        /> : 
          <View style={{margin: 128}}>
            <Text> loading chats</Text>
          </View>
        }
        <NavBar title={'Conversations'} />
      </View>
    );
  }

  goToChat(conversation) {
    openChat(conversation);
    this.props.onNavigation({ type: 'push', key: 'Chat' });
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
    borderColor: '#999',
    backgroundColor: '#fff'
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
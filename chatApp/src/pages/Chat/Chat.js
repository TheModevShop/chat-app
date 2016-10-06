'use strict';
import {branch} from 'baobab-react/higher-order';
import NavBar from '../../components/NavBar/NavBar';
import {joinRoom} from '../../actions/AppActions';
import _ from 'lodash';
import {addChat, clearChat, saveLastChatInConversation} from '../../actions/ChatActions';
import React, {Component} from 'react';

import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  StyleSheet
} from 'react-native';


import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(newProps) {
    if (_.get(newProps, 'conversation.conversation_id') && !this.state.joined) {
      joinRoom({
        name: _.get(this.props.user, 'details.first_name'),
        user: _.get(this.props.user, 'details.id'),
        conversation: _.get(newProps, 'conversation.conversation_id')
      });
      this.setState({joined: true})
    }
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
    // fetch previous messages
  }

  onSend(message) {
    const serverMessage = message[0];
    if (serverMessage) {
      addChat({
        log: serverMessage.text,
        user: _.get(this.props.user, 'details.id'),
        conversation: _.get(this.props, 'conversation.conversation_id'),
        facebook_user_id: _.get(this.props.user, 'details.facebook_user_id'),
        first_name: _.get(this.props.user, 'details.first_name'),
        last_name: _.get(this.props.user, 'details.last_name'),
      })
    }
  }

  onReceive(text) {
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, {
    //       _id: Math.round(Math.random() * 1000000),
    //       text: text,
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         // avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     }),
    //   };
    // });
  }

  renderCustomActions(props) {
    
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#333'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }


  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 60}}>
      <GiftedChat
        messages={_.get(this.props.chats, '$isLoading') ? [] : _.sortBy(this.props.chats, 'createdAt').reverse()}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: _.get(this.props.user, 'details.id')
        }}

        renderActions={null}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
       <NavBar title={'Conversations'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearChat();
  }

}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});


export default branch(Chat, {
  cursors: {
    conversation: ['conversation'],
    conversationFacet: ['facets','Conversation'],
    chats: ['facets','Chat'],
    user: ['user']
  }
});
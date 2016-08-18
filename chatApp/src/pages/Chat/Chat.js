'use strict';
import {branch} from 'baobab-react/higher-order';
import NavBar from '../../components/NavBar/NavBar';
import {joinRoom} from '../../actions/AppActions';
import _ from 'lodash';
import {addChat, clearChat, saveLastChatInConversation} from '../../actions/ChatActions';
import React, {
  Component,
} from 'react';
import {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
} from 'react-native';

var GiftedMessenger = require('react-native-gifted-messenger');
var Communications = require('react-native-communications');


var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android');
  var STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}


class Chat extends Component {

  constructor(props) {
    super(props);

    this._isMounted = false;
    this._messages = this.getInitialMessages();

    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    };

  }

  componentDidMount() {
    setTimeout(() => {
      this._isMounted = true;
      this.setState({tr: true});
    }, 320)
  }

  componentWillReceiveProps(newProps) {
    if (_.get(newProps, 'conversation.conversation.id') && !this.state.joined) {
      joinRoom({name: _.get(this.props.user, 'details.firstName'), user: _.get(this.props.user, 'details.id'), conversation: _.get(newProps, 'conversation.conversation.id')})
      this.setState({joined: true})
    }
  }

  getInitialMessages() {
    return []
  }

  setMessageStatus(uniqueId, status) {
    
  }

  setMessages(messages) {
    this._messages = messages;

    // append the message
    this.setState({
      messages: messages,
    });
  }

  handleSend(message = {}) {
    addChat({
      log: message.text,
      user: _.get(this.props.user, 'details.id'),
      conversation: _.get(this.props.conversation, 'conversation.id')
    })

  }

  onLoadEarlierMessages() {

  }

  handleReceive(message = {}) {
   
  }

  onErrorButtonPress(message = {}) {
   
  }

  onImagePress(message = {}) {
   
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 60}}>
          <GiftedMessenger
            ref={(c) => this._GiftedMessenger = c}

            styles={{
              bubbleRight: {
                marginLeft: 70,
                backgroundColor: '#007aff',
              },
            }}

            autoFocus={false}
            messages={!this._isMounted || !this.props.chats || _.get(this.props.chats, '$isLoading') ? [] : this.props.chats}
            handleSend={this.handleSend.bind(this)}
            onErrorButtonPress={this.onErrorButtonPress.bind(this)}
            maxHeight={Dimensions.get('window').height - 50 - 60}

            loadEarlierMessagesButton={!this.state.allLoaded}
            onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

            senderName='Awesome Developer'
            senderImage={null}
            onImagePress={this.onImagePress}
            displayNames={true}

            parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
            handlePhonePress={this.handlePhonePress}
            handleUrlPress={this.handleUrlPress}
            handleEmailPress={this.handleEmailPress}

            isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

            typingMessage={this.state.typingMessage}
          />
        </View>
        <NavBar title={'Chat'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  handleUrlPress(url) {
    Linking.openURL(url);
  }

  // TODO
  // make this compatible with Android
  handlePhonePress(phone) {
    
  }

  handleEmailPress(email) {
   
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (_.get(this.props.chats, 'length')) {
      saveLastChatInConversation(_.last(this.props.chats).id, _.get(this.props.conversation, 'conversation.id'));
    }    
    clearChat();
  }


}


export default branch(Chat, {
  cursors: {
    conversation: ['conversation'],
    chats: ['facets','Chat'],
    user: ['user']
  }
});
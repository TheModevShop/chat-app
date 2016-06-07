'use strict';
import {branch} from 'baobab-react/higher-order';
import {joinRoom} from '../../actions/AppActions';
import {addChat, clearChat} from '../../actions/ChatActions';
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


class Conversations extends Component {

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
    this._isMounted = true;
  }

  componentWillReceiveProps(newProps) {
    joinRoom({name: _.get(this.props.user, 'details.name.first'), user: _.get(this.props.user, 'details._id'), room: newProps.conversation._id})
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialMessages() {
    return []
    // {
    //   text: 'Are you building a chat app?',
    //   name: 'React-Bot',
    //   image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
    //   position: 'left',
    //   date: new Date(2016, 3, 14, 13, 0),
    //   uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
    // },
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
    console.log(_.get(this.props.user, 'details._id'), _.get(this.props.conversation, '_id'))
    addChat({
      log: message.text,
      user: _.get(this.props.user, 'details._id'),
      roomId: _.get(this.props.conversation, '_id')
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
    console.log(this.props)
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff',
          },
        }}

        autoFocus={false}
        messages={this.state.messages}
        handleSend={this.handleSend.bind(this)}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

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

}


export default branch(Conversations, {
  cursors: {
    conversation: ['facets','Conversation'],
    chats: ['facets','Chat'],
    user: ['user']
  }
});
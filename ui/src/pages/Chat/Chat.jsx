import React from 'react';
import {Link} from 'react-router';
import {branch} from 'baobab-react/higher-order';
import {addChat, clearChat} from 'actions/ChatActions';
import {joinRoom} from 'actions/AppActions';
import classNames from 'classnames';
import _ from 'lodash';
import './chat.less';


class Home extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    joinRoom({name: _.get(this.props.user, 'details.name.first'), user: _.get(this.props.user, 'details._id'), room: newProps.conversation._id})
  }

  render() {
    const isLoading = _.get(this.props, 'users.$isLoading');
    const users = _.get(this.props, 'users');
    const className = classNames({
      'home-wrapper': true,
      'active-location': this.props.locationDetailsDrawerOpen,
      'mobile-map-view': this.props.mobileMapView ? 'map-view-open' : '',
    });
    return (
      <div className="chat">
        <h2>chat with <span> {_.get(this.props.chat, 'activeChat.user.name.first')} </span></h2>
        <ul>
          {
            _.map(this.props.chats, (chat, i) => {
              return (
                <li key={i}>{chat.user}: {chat.log}</li>
              );
            })
          }
        </ul>

        <form onSubmit={this.addChat.bind(this)}>
          <input value={this.state.message || ''} onChange={this.message.bind(this)} />
        </form>
      </div>
    );
  }
  addChat(e) {
    e.preventDefault();
    addChat({
      log: this.state.message,
      user: _.get(this.props.user, 'details._id'),
      roomId: _.get(this.props.conversation, '_id')
    })
  }
  message(e) {
    this.setState({message: e.currentTarget.value})
  }

  componentWillUnmount() {
   clearChat(); 
  }
}


export default branch(Home, {
  cursors: {
   user: ['user'],
   chat: ['chat'],
   conversation: ['facets','Conversation'],
   chats: ['facets','Chat']
  }
});
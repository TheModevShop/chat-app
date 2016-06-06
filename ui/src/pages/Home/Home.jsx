import React from 'react';
import history from 'appHistory';
import {Link} from 'react-router';
import {branch} from 'baobab-react/higher-order';
import classNames from 'classnames';
import {openChat} from 'actions/ChatActions'
import _ from 'lodash';
import './home.less';


class Home extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
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
      <div className="home">
        {
          isLoading ?
          <div className="loading">loading</div> : 
          _.map(users, (user) => {
            return <div onClick={this.openChat.bind(this, user)} key={user._id} >
            {user.name.first} {user.name.last}
            </div>
          })
        }
      </div>
    );
  }
  openChat(user) {
    openChat(user);
    history.push('/chat');
  }
}


export default branch(Home, {
  cursors: {
   users: ['facets', 'Users']
  }
});
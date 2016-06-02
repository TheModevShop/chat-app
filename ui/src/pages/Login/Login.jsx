import React from 'react';
import {Link} from 'react-router';
import {branch} from 'baobab-react/higher-order';
import {findDOMNode} from 'react-dom';
import {getAuthentication} from 'actions/AuthenticationActions';
import './login.less';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
    }
  }

  render() {
    const error = _.get(this.props, 'authentication.error');
    return (
      <div className="login-wrapper">
        <div className="icon-logo"></div>
        <div>
          <input placeholder="Email Address"
            ref="loginID"
            type="text"
            autofocus=""
            name="email"
            required />
          <input placeholder="Password" 
            ref="password" 
            type="password" 
            name="password" 
            required />
          <button type="submit" value="Submit" onClick={this.submitForm.bind(this)}>Login</button>
        </div>
        <footer>
         
        </footer>
      </div>
    );
  }

  async submitForm(data) {
    await getAuthentication({password: findDOMNode(this.refs.password).value, email: findDOMNode(this.refs.loginID).value});
  }
}

export default branch(Login, {
  cursors: {
    authentication: 'authentication',
    awaitingAuthentication: 'awaitingAuthentication'
  }
});

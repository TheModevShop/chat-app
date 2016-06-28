'use strict';
import _ from 'lodash';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {addFacebookCredentials} from '../../actions/UserActions';
import {getAuthentication, teardownSession} from '../../actions/AuthenticationActions';
import {
  Text,
  View,
  StyleSheet, TouchableHighlight
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

// here we are: define your domain model
const Account = t.struct({
  email: t.String,
  password:t.String
});

var options = {
  fields: {
    password: {
      autoCapitalize: 'none',
      autoCorrect: false,
      password: true
    },
    email: {
      autoCapitalize: 'none'
    }
  }

}; // optional rendering options (see documentation)


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
    //   if (!error) {        
    //     addFacebookCredentials({userId: data.credentials.userId, tokenExpiration: data.credentials.tokenExpirationDate});
    //   } else {
    //     console.log("Error: ", data);
    //   }
    // })
  }


  render() {
    return (
      <View style={{margin: 128}}>
        <Form
          ref="form"
          type={Account}
          options={options}
        />
        <TouchableHighlight onPress={this.onLogin.bind(this)} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableHighlight>


        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={async (data) => {
            await getAuthentication({facebookUser: _.get(data, 'credentials.userId'), facebook: _.get(data, 'credentials.token')});
            await addFacebookCredentials(data.credentials); // MAY NOT NEED
          }}
          onLogout={() => {
            teardownSession();
          }}
          onLoginFound={(data) => {
            console.log("Existing login found.");
            getAuthentication({facebook: _.get(data, 'credentials.token')});
            console.log(data);
            // this.setState({ user : data.credentials });
          }}
          onLoginNotFound={() => {
            console.log("No user logged in.");
            // this.setState({ user : null });
          }}
          onError={(data) => {
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={() => {
            console.log("User cancelled.");
          }}
          onPermissionsMissing={(data) => {
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    );
  }
  handleFormFocus(e) {

  }

  async onLogin() {
    const value = this.refs.form.getValue();
    if (value) {
      const token = await getAuthentication(value);
      if (token) {
        // Actions.home();
      }
    }
  }
}

export default branch(Login, {
  cursors: {
    view: ['home']
  }
});
'use strict';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
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

var options = {}; // optional rendering options (see documentation)


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const goToPageTwo = () => Actions.chat({text: 'Hello World!'}); 
    return (
      <View style={{margin: 128}}>
        <Text onPress={goToPageTwo}>This is PageTwo!</Text>

        <Form
          ref="form"
          type={Account}
          options={options}
        />
        <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableHighlight>


        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={(data) => {
            console.log("Logged in!");
            console.log(data);
            // this.setState({ user : data.credentials });
          }}
          onLogout={() => {
            console.log("Logged out.");
            // this.setState({ user : null });
          }}
          onLoginFound={(data) => {
            console.log("Existing login found.");
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

  onPress() {
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.warn(value); // value here is an instance of Person
    }
  }
}

export default branch(Login, {
  cursors: {
    view: ['home']
  }
});
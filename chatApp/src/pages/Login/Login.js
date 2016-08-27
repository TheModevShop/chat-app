'use strict';
import _ from 'lodash';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {addFacebookCredentials} from '../../actions/UserActions';
import {getAuthentication, teardownSession} from '../../actions/AuthenticationActions';
import {
  Text,
  View,
  StyleSheet, 
  TouchableHighlight,
  Image
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

// https://github.com/magus/react-native-facebook-login/tree/master/example/components
  render() {
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <Image style={{width: null, height: null, resizeMode: 'contain', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}} source={require('../../images/landing.jpg')} />
        <View style={{height: 60, flex: 1, backgroundColor: '#415dae', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>

          <FBLogin style={{marginBottom: 10, }}
            permissions={["email","user_friends", "public_profile", "user_about_me", "user_photos", "user_likes", "user_work_history", "user_website"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={async (data) => {
              await getAuthentication({userId: _.get(data, 'credentials.userId'), token: _.get(data, 'credentials.token'), tokenExpirationDate: _.get(data, 'credentials.tokenExpirationDate')});
              await addFacebookCredentials(data.credentials); // MAY NOT NEED
            }}
            onLogout={() => {
              teardownSession();
            }}
            onLoginFound={(data) => {
              console.log("Existing login found.");
              getAuthentication({userId: _.get(data, 'credentials.userId'), token: _.get(data, 'credentials.token'), tokenExpirationDate: _.get(data, 'credentials.tokenExpirationDate')});
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

// <Form
//   ref="form"
//   type={Account}
//   options={options}
// />
// <TouchableHighlight onPress={this.onLogin.bind(this)} underlayColor='#99d9f4'>
//   <Text>Save</Text>
// </TouchableHighlight>

export default branch(Login, {
  cursors: {
    view: ['home']
  }
});
'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {getAuthentication} from '../../actions/AuthenticationActions';
import {
  Text,
  View,
  StyleSheet, TouchableHighlight
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

// here we are: define your domain model
const Account = t.struct({
  name: t.String,
  descition: t.String,
  price:t.Number,

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


class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const goToPageTwo = () => Actions.home({text: 'Hello World!'}); 
    return (
      <View style={{margin: 128}}>
        <Text onPress={goToPageTwo}>Add A Session</Text>

        <Form
          ref="form"
          type={Account}
          options={options}
        />
        <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableHighlight>

      </View>
    );
  }
  handleFormFocus(e) {

  }

  onPress() {
    const value = this.refs.form.getValue();
    if (value) {
      console.log(value)
      getAuthentication(value)
    }
  }
}

export default branch(AddSession, {
  cursors: {
    skills: ['facets', 'Skills']
  }
});
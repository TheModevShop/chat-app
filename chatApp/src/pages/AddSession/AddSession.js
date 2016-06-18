'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {getAuthentication} from '../../actions/AuthenticationActions';
import {addSession} from '../../actions/SessionActions';
import moment from 'moment';
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
  description: t.String,
  price:t.Number,

});

var options = {
  fields: {
    
  }

}; // optional rendering options (see documentation)


class AddSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const skills =  _.map(this.props.skills, (skill) => {
      return (
        <Text style={{color: this.state.selectedSkill === skill._id ? 'red' : 'black'}} key={skill._id} onPress={() => {this.setState({selectedSkill: skill._id})}}>{skill.name}</Text>
      )
    })
      
    return (
      <View style={{margin: 50}}>
        <Text>Add A Session</Text>
        <View>
            {skills}
        </View>

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
    const form = this.refs.form.getValue();
    if (form) {
      // do validation
     const session =  this.createSession(form);
     addSession(session)
    }
  }

  createSession(form) {
    const time = moment();
    return {
      name: form.name,
      skill: this.state.selectedSkill,
      image: 'http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
      capacity: 1,
      price: 3200,
      notes: '',
      dateAndTime: time,
      date:  moment(time).format('YYYYMMDD'),
      time: {
        start: '3:00',
        end: '5:00'
      },
      description: form.description,
      enrolled: [],
      location: {}
    }
  }
}

export default branch(AddSession, {
  cursors: {
    skills: ['facets', 'Skills'],
    user: ['user']
  }
});
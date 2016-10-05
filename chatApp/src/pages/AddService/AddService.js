import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import _ from 'lodash';
import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  Dimensions,
  ListView,
  Image,
  TouchableHighlight,
  Easing
} from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

// here we are: define your domain model
const Listing = t.struct({
  name: t.String,
  description: t.String,
  price:t.Number,

});

var options = {
  fields: {
    
  }

}; // optional rendering options (see documentation)


class AddService extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }


  render() {
    const skills =  _.map(this.props.skills, (skill) => {
      return (
        <Text style={{color: this.state.selectedSkill === skill.id ? 'red' : 'black'}} key={skill.id} onPress={this.setSkillForListing.bind(this, skill.id)}>{skill.name}</Text>
      )
    })

    return (
       <View style={{flex: 1}}>
        <Text>Add Listing</Text>
        <View>
            {skills}
        </View>

        <Form
          ref="form"
          type={Listing}
          options={options}
        />
        <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }

  setSkillForListing(skillId) {
    this.setState({selectedSkill: skillId})
  }

  onPress() {
    const form = this.refs.form.getValue();
    if (form) {
      // do validation
     const service =  this.createService(form);
   addService(service)
    }
  }

  createService(form) {
    const time = moment();
    return {
      service_description: form.description,
      service_name: "todo",
      active: true,
      image: 'http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
      service_capacity: 3,
      service_duration: 30,
      service_price: 60,
      service_skill_id: this.state.selectedSkill
    }
  }

}

export default branch(AddService, {
  cursors: {
    view: ['addListing'],
    skills: ['facets', 'Skills'],
    user: ['user']
  }
});
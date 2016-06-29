import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addListing} from '../../actions/ListingActions';
import moment from 'moment';
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


class AddListing extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }


  render() {
    const skills =  _.map(this.props.skills, (skill) => {
      return (
        <Text style={{color: this.state.selectedSkill === skill._id ? 'red' : 'black'}} key={skill._id} onPress={() => {this.setState({selectedSkill: skill})}}>{skill.name}</Text>
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

  onPress() {
    const form = this.refs.form.getValue();
    if (form) {
      // do validation
     const listing =  this.createListing(form);
     addListing(listing)
    }
  }

  createListing(form) {
    const time = moment();
    return {
      name: `${this.state.selectedSkill.name} with ${_.get(this.props.user, 'details.name.first')} ${_.get(this.props.user, 'details.name.last')}`,
      skill: this.state.selectedSkill._id,
      image: 'http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
      capacity: 1,
      price: 3200,
      description: form.description,
      location: {}
    }
  }

}

export default branch(AddListing, {
  cursors: {
    view: ['addListing'],
    skills: ['facets', 'Skills'],
    user: ['user']
  }
});
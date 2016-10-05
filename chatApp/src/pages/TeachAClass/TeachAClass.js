import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';

import buttonStyles from '../../styles/buttonStyle';
import textStyles from '../../styles/textStyle';

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


class TeachAClass extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }


  render() {
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 70, flex: 1, padding: 20}}>
          <View style={{padding: 40, alignSelf: 'center'}}>
            <Text>We want all the teachers on Tyro to be awesome. To help find the best, we have every new teacher apply.</Text>
            <Text>Answer the next few questions to to request approval to teach a class.</Text>      
          </View>
          
          <Button cta="Answer Questions" disabled={false}  onPress={this.goToCategory.bind(this)} />

        </View>

        <NavBar leftActionIcon={'ios-close'} title={'Teach a Class'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  goToCategory() {
    this.props.onNavigation({ type: 'push', key: 'ChooseASkill' })
  }


}

export default branch(TeachAClass, {
  cursors: {
    user: ['user']
  }
});
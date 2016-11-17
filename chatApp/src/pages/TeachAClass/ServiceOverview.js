import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import NavBar from '../../components/NavBar/NavBar';
import * as actions from '../../actions/TeachAClassActions';
import buttonStyles from '../../styles/buttonStyle';
import {openLightBox} from '../../actions/ModalActions';
import currency from '../../utility/currency';
import MapViewPreview from '../../components/MapViewPreview/MapViewPreview.js';
import ResponsiveImage from 'react-native-responsive-image';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import textStyle from '../../styles/textStyle';
import * as constants from '../../styles/styleConstants';


class TeachAClass extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }


  render() {
    const agent = _.get(this.props, 'user.details', {});
    const service = _.get(this.props, 'teachAClassFlow', {});
    const name = _.get(service, 'serviceBasicData.title.value', '');
    const capacity = _.get(service, 'serviceBasicData.capacity.value');
    const duration = _.get(service, 'serviceBasicData.duration.value');
    const price = _.get(service, 'serviceBasicData.price.value');
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        
         
          <ScrollView style={{marginTop: 60}}>
            <ResponsiveImage source={{uri: service.image}} initWidth="100%" initHeight="250"/>
            <View>
              <Text>{name}</Text> 
              <Text>{currency(price)}</Text> 
              <Text>{duration} minutes</Text> 
              <Text>max capacity: {capacity}</Text> 
              <Text>Instructed by {agent.first_name} {agent.last_name}</Text> 
            </View>
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 130,
              height: 150,
              alignItems:'center',
              justifyContent: 'flex-end',
              zIndex: 2
            }}>
              <Image style={{borderRadius: 75, height: 150, width: 150}} source={{uri: `https://graph.facebook.com/${_.get(agent, 'facebook_user_id')}/picture?width=200&height=200`}}/>
            </View>

            <View style={{
                marginTop: 50
              }}>

            <View style={{paddingHorizontal: constants.PADDING_LARGE}}>
                <Text style={[textStyle.h1, textStyle.bold]}>{service.name}</Text>
              </View>
              <MapViewPreview y={service.y} x={service.x} disabled={true} />
            </View>
          </ScrollView> 

          <TouchableHighlight style={buttonStyles.bottomButton} onPress={this.goToCategory.bind(this)} underlayColor='#99d9f4'>
            <Text style={buttonStyles.buttonText}>
              Complete
            </Text>
          </TouchableHighlight>
        
        <NavBar title={'Service Overview'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  async goToCategory() {
    const success = await actions.registerResourceAndService();
    if (success) {
      this.props.onNavigation({ type: 'push', key: 'ServiceCreatedConfirmation' })
    } else {
      openLightBox({
        type: 'confirmationErrorLightBox', 
      });
    }
  }


}

export default branch(TeachAClass, {
  cursors: {
    user: ['user'],
    teachAClassFlow: ['teachAClassFlow'],
  }
});
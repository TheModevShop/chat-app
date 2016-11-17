import React, { Component } from 'react';
import _ from 'lodash';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../actions/TeachAClassActions';
import moment from 'moment';
import Button from '../../components/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
import buttonStyles from '../../styles/buttonStyle';
import formStyles from '../../styles/formStyles';
import formHigherOrder from '../../HigherOrder/formHigherOrder';
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow'

import SectionHeader from '../../components/SectionHeader/SectionHeader';
import AddPhotoBanner from '../../components/AddPhotoBanner/AddPhotoBanner';

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
  Easing,
  ScrollView
} from 'react-native';

const schema = {
  price: {}
}


class CreateService extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  componentWillMount() {
    const formData = _.get(this.props, 'teachAClassFlow.serviceBasicData');
    this.props.setDataOnForm(formData || {});
  }

  componentDidMount() {
    const values = this.props.outputData || {};
    if (_.get(values, 'title.value')) {
      this.timeout = setTimeout(() => {
        this.refs.title.focus();
      }, 500)
    }
  }

  render() {
    const values = this.props.outputData || {};
    const equipmentRequired = _.get(this.props, 'teachAClassFlow.equipmentRequired', null);
    const hasAnsweredEquipmentRequired = _.has(this.props, 'teachAClassFlow.equipmentRequired', null);
    const formComplte = this.props.formComplete && hasAnsweredEquipmentRequired;
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 65, flex: 1}}>
          <ScrollView style={{flex: 1}}>
            
            <AddPhotoBanner image={_.get(this.props, 'teachAClassFlow.image')} onImageLoad={(img) => actions.setImage(img)} />
            <SectionHeader title="Class title" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="ie. Underwater Basketweaving for Beginners"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'title')]}
                returnKeyType = {"next"}
                ref="title"
                autoCapitalize='words'
                autoCorrect={false}
                autoFocus={false}
                onChangeText={this.props.updateInput.bind(this, 'title')}
                onBlur={this.props.onInputBlur.bind(this, 'title')}
                onFocus={this.props.onInputFocus.bind(this, 'title')}
                value={_.get(values, 'title.value')}
                onSubmitEditing={(event) => {
                  this.refs.price.focus();
                }} />
            </View>

            <SectionHeader title="class price" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="Price"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'price')]}
                returnKeyType = {"next"}
                ref="price"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'price')}
                onBlur={this.props.onInputBlur.bind(this, 'price')}
                onFocus={this.props.onInputFocus.bind(this, 'price')}
                value={_.get(values, 'price.value')}
                onSubmitEditing={(event) => {
                  this.refs.duration.focus();
                }} />
            </View>

            <SectionHeader title="class duration" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="Duration"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'duration')]}
                returnKeyType = {"next"}
                ref="duration"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'duration')}
                onBlur={this.props.onInputBlur.bind(this, 'duration')}
                onFocus={this.props.onInputFocus.bind(this, 'duration')}
                value={_.get(values, 'duration.value')}
                onSubmitEditing={(event) => {
                  this.refs.capacity.focus();
                }} />
            </View>

            <SectionHeader title="class capacity" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="Capacity"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'capacity')]}
                returnKeyType = {"done"}
                ref="capacity"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'capacity')}
                onBlur={this.props.onInputBlur.bind(this, 'capacity')}
                onFocus={this.props.onInputFocus.bind(this, 'capacity')}
                value={_.get(values, 'capacity.value')}
                onSubmitEditing={(event) => {
                  
                }} />
            </View>

            <SectionHeader title="Equipment required" />
            <View style={[formStyles.inputWrapper, {marginBottom: 130}]}>
              <FullTappableRow active={equipmentRequired === true} hideIcon={true} topBorder={true} title={'Yes'} onPress={() => actions.setEquipmentRequired(true)} />
              <FullTappableRow active={equipmentRequired === false} hideIcon={true} title={'No'} onPress={() => actions.setEquipmentRequired(false)} />
            </View>

          </ScrollView>
          
        
          <Button cta="Create Service" disabled={!formComplte}  onPress={this.goToCategory.bind(this)} />

        </View>

        <NavBar title={'Create Service'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  goToCategory() {
    this.addDataToCursor();
    this.clearTimeouts();

    const equipmentRequired = _.get(this.props, 'teachAClassFlow.equipmentRequired')
    if (equipmentRequired) {
      this.props.onNavigation({ type: 'push', key: 'EquipmentRequired' });
    } else {
      this.props.onNavigation({ type: 'push', key: 'ServiceOverview' });
    }
  }

  addDataToCursor() {
    actions.addServiceBasicData(this.props.outputData || {});
  }

  clearTimeouts() {
    clearTimeout(this.timeout);
  }
  
  componentWillUnmount() {
    this.addDataToCursor();
    this.clearTimeouts();
  }

}

const makeComponent = _.flowRight(formHigherOrder, branch);
export default makeComponent(CreateService, {
  cursors: {
    user: ['user'],
    teachAClassFlow: ['teachAClassFlow']
  }
});

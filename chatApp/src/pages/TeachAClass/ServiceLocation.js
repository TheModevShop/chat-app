import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import _ from 'lodash';
// higher order
import formHigherOrder from '../../HigherOrder/formHigherOrder';

// components
import NavBar from '../../components/NavBar/NavBar';
import MapViewPreview from '../../components/MapViewPreview/MapViewPreview.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

import * as actions from '../../actions/locationActions';
import {openLightBox, openHud, closeHud} from '../../actions/ModalActions';

import ResponsiveImage from 'react-native-responsive-image';
import currency from '../../utility/currency';
import {setServiceLocation} from '../../actions/TeachAClassActions';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

// styles
import textStyle from '../../styles/textStyle';
import * as constants from '../../styles/styleConstants';
import buttonStyles from '../../styles/buttonStyle';
import formStyles from '../../styles/formStyles';

const schema = {}

class ServiceLocation extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  componentWillMount() {
    const formData = _.get(this.props, 'teachAClassFlow.location');
    this.props.setDataOnForm(formData || {});
  }

  updateAddress(val) {
    this.props.updateInput('street_address_1', val);
    this.googleAutoComplete(val)
  }


  render() {
    const values = this.props.outputData || {}; 
    const formComplete = this.props.formComplete;
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <ScrollView style={{marginTop: 60}}>
          <SectionHeader title="Street Address" />
          <View style={[formStyles.inputWrapper, {zIndex: 22}]}>
              <TextInput
                placeholder="address line 1"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'street_address_1')]}
                returnKeyType = {"next"}
                ref="street_address_1"
                autoCapitalize='words'
                autoCorrect={false}
                autoFocus={false} 
                onChangeText={this.updateAddress.bind(this)}
                onBlur={this.props.onInputBlur.bind(this, 'street_address_1')}
                onFocus={this.props.onInputFocus.bind(this, 'street_address_1')}
                value={_.get(values, 'street_address_1.value')}
                onSubmitEditing={(event) => {
                  this.refs.price.focus();
                }} />
                {
                  _.get(this.state.predictions, 'length') ?
                  this.renderPredictions() : null
                }
            </View>

            <View style={{marginTop: 0, flex: 1, flexDirection: 'row'}}>
              
              <View style={[{flex: 2}]}>
                <SectionHeader title="zip code" />
                <View style={[formStyles.inputWrapper, {flex: 2}]}>
                  <TextInput
                    placeholder="Price"
                    style={[formStyles.textInput, this.props.addErrorStyling(values, 'zipcode')]}
                    returnKeyType = {"next"}
                    keyboardType={"numeric"}
                    ref="zipcode"
                    autoCapitalize='words'
                    autoCorrect={false}
                    onChangeText={this.props.updateInput.bind(this, 'zipcode')}
                    onBlur={this.props.onInputBlur.bind(this, 'zipcode')}
                    onFocus={this.props.onInputFocus.bind(this, 'zipcode')}
                    value={_.get(values, 'zipcode.value')}
                    onSubmitEditing={(event) => {
                      this.refs.duration.focus();
                    }} />
                </View>
              </View>

              <View style={[{flex: 2}]}>
                <SectionHeader title="city" />
                <View style={[formStyles.inputWrapper]}>
                  <TextInput
                    placeholder="Price"
                    style={[formStyles.textInput, this.props.addErrorStyling(values, 'city')]}
                    returnKeyType = {"next"}
                    keyboardType={"numeric"}
                    ref="city"
                    autoCapitalize='words'
                    autoCorrect={false}
                    onChangeText={this.props.updateInput.bind(this, 'city')}
                    onBlur={this.props.onInputBlur.bind(this, 'city')}
                    onFocus={this.props.onInputFocus.bind(this, 'city')}
                    value={_.get(values, 'city.value')}
                    onSubmitEditing={(event) => {
                      this.refs.duration.focus();
                    }} />
                </View>
              </View>


              <View style={[{flex: 1}]}>
                <SectionHeader title="state" />
                <View style={[formStyles.inputWrapper]}>
                  <TextInput
                    placeholder="Price"
                    style={[formStyles.textInput, this.props.addErrorStyling(values, 'state')]}
                    returnKeyType = {"next"}
                    keyboardType={"numeric"}
                    ref="state"
                    autoCapitalize='words'
                    autoCorrect={false}
                    onChangeText={this.props.updateInput.bind(this, 'state')}
                    onBlur={this.props.onInputBlur.bind(this, 'state')}
                    onFocus={this.props.onInputFocus.bind(this, 'state')}
                    value={_.get(values, 'state.value')}
                    onSubmitEditing={(event) => {
                      this.refs.duration.focus();
                    }} />
                </View>
              </View>

            </View>


            {
              _.get(values, 'lng.value') ?
              <View style={{marginTop: 0, flex: 1, position: 'relative'}}>
                <MapViewPreview y={_.get(values, 'lat.value')} x={_.get(values, 'lng.value')} disabled={false} />
              </View> : null
            }

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
    this.props.onNavigation({ type: 'push', key: 'ServiceOverview' })
  }

  renderPredictions() {
    return (
      <View style={styles.predictionsWrapper}>
        {
          _.map(this.state.predictions, (prediction, i) => {
            return (
              <View key={'prediction-'+i} style={styles.prediction}>
                <TouchableOpacity style={styles.predictionContent} onPress={this.searchGooglePlaces.bind(this, prediction.place_id)}>
                  <Text numberOfLines={1}>{prediction.description}</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )
  }

  // Google Api Address Lookup
  async googleAutoComplete(value) {
    const predictions = await actions.queryGoogleAutoComplete(value);
    this.setState({predictions})
  }

  async searchGooglePlaces(id) {
    const place = await actions.placeDetails(id);
    let address;
    if (place) {
      address = {};
      _.forEach(place, (value, key) => {
        address[key] = {
          value,
          dirty: true,
          valid: true
        }
      });
      setServiceLocation(address);
      this.props.setDataOnForm(address);
      this.clearPredictions();
    }
  }

  clearPredictions() {
    this.setState({predictions: []});
  }


}



const styles = StyleSheet.create({
  predictionsWrapper: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: constants.ROW_HEIGHT,
    bottom: 0,
    zIndex: 100
  },
  prediction: {
    height: constants.ROW_HEIGHT,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: constants.ALUMINUM
  },
  predictionContent: {
    height: constants.ROW_HEIGHT,
    paddingHorizontal: constants.PADDING_STANDARD,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})



const makeComponent = _.flowRight(_.partialRight(formHigherOrder, schema), branch);
export default makeComponent(ServiceLocation, {
  cursors: {
    user: ['user'],
    teachAClassFlow: ['teachAClassFlow']
  }
});
import React, { Component } from 'react';
import _ from 'lodash';
import {branch} from 'baobab-react/higher-order';

import Button from '../../components/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
import buttonStyles from '../../styles/buttonStyle';
import formStyles from '../../styles/formStyles';
import formHigherOrder from '../../HigherOrder/formHigherOrder';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import * as actions from '../../actions/locationActions';
import * as constants from '../../styles/styleConstants';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const schema = {
  price: {    },
  duration: {},
  capacity: {},
  title: {}
}


class IdentityVerificationForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  componentWillMount() {
    const formData = _.get(this.props, 'teachAClassFlow.serviceBasicData');
    this.props.setDataOnForm(formData || {});
  }

  
  render() {
    const values = this.props.outputData || {};
    const formComplete = this.props.formComplete;
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <SectionHeader title="first name" />
        <View style={[formStyles.inputWrapper, {zIndex: 22}]}>
          <TextInput
            placeholder="first name"
            style={[formStyles.textInput, this.props.addErrorStyling(values, 'first_name')]}
            returnKeyType = {"next"}
            ref="first_name"
            autoCapitalize='words'
            autoCorrect={false}
            autoFocus={false} 
            onChangeText={this.updateAddress.bind(this)}
            onBlur={this.props.onInputBlur.bind(this, 'first_name')}
            onFocus={this.props.onInputFocus.bind(this, 'first_name')}
            value={_.get(values, 'first_name.value')}
            onSubmitEditing={(event) => {
              this.refs.last_name.focus();
            }} />
            {
              _.get(this.state.predictions, 'length') ?
              this.renderPredictions() : null
            }
        </View>

        <SectionHeader title="last name" />
        <View style={[formStyles.inputWrapper, {zIndex: 22}]}>
          <TextInput
            placeholder="last name"
            style={[formStyles.textInput, this.props.addErrorStyling(values, 'last_name')]}
            returnKeyType = {"next"}
            ref="last_name"
            autoCapitalize='words'
            autoCorrect={false}
            autoFocus={false} 
            onChangeText={this.updateAddress.bind(this)}
            onBlur={this.props.onInputBlur.bind(this, 'last_name')}
            onFocus={this.props.onInputFocus.bind(this, 'last_name')}
            value={_.get(values, 'last_name.value')}
            onSubmitEditing={(event) => {
              this.refs.street_address_1.focus();
            }} />
            {
              _.get(this.state.predictions, 'length') ?
              this.renderPredictions() : null
            }
        </View>

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
              this.refs.zipcode.focus();
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
                  this.refs.city.focus();
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
                  this.refs.state.focus();
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
                  this.refs.month.focus();
                }} />
            </View>
          </View>
        </View>



        <View style={{marginTop: 0, flex: 1, flexDirection: 'row'}}>
          <View style={[{flex: 2}]}>
            <SectionHeader title="date of birth" />
            <View style={[formStyles.inputWrapper, {flex: 2}]}>
              <TextInput
                placeholder="12"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'month')]}
                returnKeyType = {"next"}
                keyboardType={"numeric"}
                ref="month"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'month')}
                onBlur={this.props.onInputBlur.bind(this, 'month')}
                onFocus={this.props.onInputFocus.bind(this, 'month')}
                value={_.get(values, 'month.value')}
                onSubmitEditing={(event) => {
                  this.refs.day.focus();
                }} />
            </View>
          </View>

          <View style={[{flex: 2}]}>
            <SectionHeader title="" />
            <View style={[formStyles.inputWrapper]}>
              <TextInput
                placeholder="09"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'day')]}
                returnKeyType = {"next"}
                keyboardType={"numeric"}
                ref="day"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'day')}
                onBlur={this.props.onInputBlur.bind(this, 'day')}
                onFocus={this.props.onInputFocus.bind(this, 'day')}
                value={_.get(values, 'day.value')}
                onSubmitEditing={(event) => {
                  this.refs.year.focus();
                }} />
            </View>
          </View>

          <View style={[{flex: 1}]}>
            <SectionHeader title="" />
            <View style={[formStyles.inputWrapper]}>
              <TextInput
                placeholder="89"
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'year')]}
                returnKeyType = {"next"}
                keyboardType={"numeric"}
                ref="year"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'year')}
                onBlur={this.props.onInputBlur.bind(this, 'year')}
                onFocus={this.props.onInputFocus.bind(this, 'year')}
                value={_.get(values, 'year.value')}
                onSubmitEditing={(event) => {
                  
                }} />
            </View>
          </View>
        </View>



      </View>
    );
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

  updateAddress(val) {
    this.props.updateInput('street_address_1', val);
    this.googleAutoComplete(val)
  }

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
      // setServiceLocation(address);
      this.props.setDataOnForm(address);
      this.clearPredictions();
    }
  }

  clearPredictions() {
    this.setState({predictions: []});
  }

  addDataToCursor() {
    // actions.addServiceBasicData(this.props.outputData || {});
  }
  
  componentWillUnmount() {

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

const makeComponent = _.flowRight(_.partialRight(formHigherOrder, schema));
export default makeComponent(IdentityVerificationForm);

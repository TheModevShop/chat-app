// import React, { Component } from 'react';
// import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, TouchableWithoutFeedback } from 'react-native';
// import BottomButton from './BottomButton';
// import Wtext from './Wtext';
// import _ from 'lodash'
// import * as constants from '../utility/constants';
// import * as actions from '../actions/addressActions';
// import dismissKeyboard from 'dismissKeyboard';

// const zipCodeEscapedPattern = '^[0-9]{5}(?:-[0-9]{4})?$';
// const phoneNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
// const pobReg = /\bbox(?:\b$|([\s|\-]+)?[0-9]+)|(p[\-\.\s]?o.?[\-\s]?|post office\s)b(\.|ox)?/igm;

// class ShippingAddressForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       schema: {
//         firstname: {
//           regex: '.{2,}',
//         },
//         lastname: {
//           regex: '.{2,}',
//         },
//         street_line_1: {
//           regex: pobReg,
//           regexResult: false
//         },
//         street_line_2: {
//           regex: '',
//           required: false
//         },
//         zipcode: {
//           regex: zipCodeEscapedPattern,
//         },
//         phone: {
//           regex: phoneNumberPattern
//         },
//         city: {
//           regex: ''
//         },
//         state: {
//           regex: ''
//         }
//       }
//     };
//   }

//   componentWillMount() {
//     const editAddress = _.get(this.props.newAddress, 'id.value');
//     if(editAddress) {
//       this.setState({editAddressId: editAddress});
//     }
//   }

//   componentDidMount() {
//     this.debounceGoogleSearch = _.debounce(this.googleAutoComplete, 100)
//     this.validateForm(this.props.newAddress);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (!_.isEqual(nextProps.newAddress, this.props.newAddress)) {
//       this.validateForm(nextProps.newAddress);
//     }
//   }

//   validateForm(address) {
//     address = _.cloneDeep(address);
//     let formValid = true;
//     _.map(this.state.schema, (value, key) => {
//       const inputValue = _.get(address[key], 'value');
//       let valid;
//       if (!inputValue && value.required === false) {
//         return true
//       }

//       if (value.regex && inputValue) {
//         valid = !!inputValue.toString().match(new RegExp(value.regex))
//         valid = _.has(value, 'regexResult') ? value.regexResult === valid : valid;
//       } else {
//         valid = !!inputValue
//       }
//       if (!valid && formValid) {
//         formValid = false
//       }

//       this.setInputValidation(key, valid, address)
//       return valid
//     })

//     if (this.state.formComplete !== formValid) {
//       this.setState({
//         formComplete: formValid
//       });
//     }

//     const {onValid = _.noop} = this.props
//     onValid(formValid)

//     if (formValid && this.state.currentFocus === 'phone') {
//       const {doneCallback} = this.props
//       if (doneCallback) {
//         doneCallback()
//       } else {
//         this.dismissKeyboard()
//       }
//     }

//   }

//   setInputValidation(key, valid, address) {
//     if (address[key]) {
//       _.assign(address[key], {error: !valid});
//       actions.setAddressValue(key, address[key]);
//     }
//   }

//   dismissKeyboard(e) {
//     dismissKeyboard();
//   }

//   render() {
//     const {showCompleteButton = true, allowDefaulting = true} = this.props
//     const values = this.props.newAddress || {};
//     return (
//       <View style={{flex: 1, position: 'relative'}}>
//         <ScrollView ref={(scrollView) => { this.scrollView = scrollView; }} scrollEnabled={true} keyboardShouldPersistTaps={true}>
//           <View style={{marginTop: 20, flex: 1, position: 'relative'}}>
//             <View style={{marginBottom: 20}}>

//               <View style={[styles.inputGroup]}>
//                 <View style={[styles.inputWrapper, {}]}>
//                   <TextInput
//                     placeholder="First name"
//                     style={[styles.textInput, this.addErrorStyling(values, 'firstname')]}
//                     returnKeyType = {"next"}
//                     ref="firstname"
//                     autoCapitalize='words'
//                     autoCorrect={false}
//                     autoFocus={true}
//                     onChangeText={this.updateInput.bind(this, 'firstname')}
//                     onBlur={this.onInputBlur.bind(this, 'firstname')}
//                     onFocus={this.onInputFocus.bind(this, 'firstname')}
//                     value={_.get(values, 'firstname.value')}
//                     onSubmitEditing={(event) => {
//                     this.refs.lastname.focus();
//                     }} />
//                 </View>

//                 <View style={[styles.inputWrapper, {}]}>
//                   <TextInput
//                     placeholder="Last name"
//                     autoCapitalize='words'
//                     returnKeyType = {"next"}
//                     ref="lastname"
//                     autoCorrect={false}
//                     style={[styles.textInput, this.addErrorStyling(values, 'lastname')]}
//                     onChangeText={this.updateInput.bind(this, 'lastname')}
//                     onBlur={this.onInputBlur.bind(this, 'lastname')}
//                     onFocus={this.onInputFocus.bind(this, 'lastname')}
//                     value={_.get(values, 'lastname.value')}
//                     onSubmitEditing={(event) => {
//                       this.refs.street_line_1.focus();
//                     }} />
//                 </View>
//               </View>

//               <View style={{zIndex: 22}}>
//                 <View style={styles.inputWrapper}>
//                   <TextInput
//                     placeholder="Street address"
//                     clearButtonMode={'while-editing'}
//                     style={[styles.textInput, this.addErrorStyling(values, 'street_line_1')]}
//                     autoCorrect={false}
//                     autoCapitalize='words'
//                     returnKeyType = {"next"}
//                     ref="street_line_1"
//                     onBlur={this.onInputBlur.bind(this, 'street_line_1', 'clearPredictions')}
//                     onFocus={this.onInputFocus.bind(this, 'street_line_1')}
//                     onChangeText={this.updateInput.bind(this, 'street_line_1')}
//                     value={_.get(values, 'street_line_1.value')}
//                     onSubmitEditing={(event) => {
//                       this.refs.street_line_2.focus();
//                     }} />
//                 </View>
//                 {
//                   _.get(this.state.predictions, 'length') ?
//                   this.renderPredictions() : null
//                 }
//               </View>

//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   placeholder="Apartment, suite, etc (optional)"
//                   style={[styles.textInput, this.addErrorStyling(values, 'street_line_2')]}
//                   returnKeyType = {"next"}
//                   autoCorrect={false}
//                   autoCapitalize='words'
//                   ref="street_line_2"
//                   onSubmitEditing={(event) => {
//                     this.refs.phone.focus();
//                   }}
//                   onChangeText={this.updateInput.bind(this, 'street_line_2')}
//                   onBlur={this.onInputBlur.bind(this, 'street_line_2')}
//                   onFocus={this.onInputFocus.bind(this, 'street_line_2')}
//                   value={_.get(values, 'street_line_2.value')} />
//               </View>

//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   placeholder="Zipcode"
//                   maxLength={5}
//                   returnKeyType={"next"}
//                   ref="zipcode"
//                   onSubmitEditing={(event) => {
//                     this.refs.phone.focus();
//                   }}
//                   style={[styles.textInput, this.addErrorStyling(values, 'zipcode')]}
//                   keyboardType="number-pad"
//                   onChangeText={this.updateInput.bind(this, 'zipcode')}
//                   onBlur={this.onInputBlur.bind(this, 'zipcode')}
//                   onFocus={this.onInputFocus.bind(this, 'zipcode')}
//                   value={_.get(values, 'zipcode.value')} />
//                   {
//                     _.get(values, 'city.value') && _.get(values, 'state.value') ?
//                     <Text style={styles.location}>{_.get(values, 'city.value')}, {_.get(values, 'state.value')} </Text> : null
//                   }
//               </View>

//               <View style={[styles.inputWrapper]}>
//                 <TextInput
//                   placeholder="Phone"
//                   keyboardType="number-pad"
//                   style={[styles.textInput, this.addErrorStyling(values, 'phone')]}
//                   ref="phone"
//                   returnKeyType="done"
//                   onChangeText={this.updateInput.bind(this, 'phone')}
//                   onBlur={this.onInputBlur.bind(this, 'phone')}
//                   onFocus={this.onInputFocus.bind(this, 'phone')}
//                   value={_.get(values, 'phone.value')} />
//               </View>

//               {
//                 _.get(this.props.addresses, 'items.length') && allowDefaulting ?
//                 <View style={[styles.inputWrapper, {paddingHorizontal: constants.SPACE_STANDARD, marginTop: constants.SPACE_LARGE, flex: 1, flexDirection: 'row', justifyContent: 'space-between', 'alignItems': 'center'}]}>
//                   <Wtext color={constants.COLOR_GRAY_LIGHT}>Make default address</Wtext>
//                   <Switch
//                     onTintColor={constants.COLOR_PALMETTO}
//                     onValueChange={this.updateInput.bind(this, 'default', !_.get(values, 'default.value'))}
//                     value={_.get(values, 'default.value')} />
//                 </View> : null
//               }

//               {
//                 this.state.editAddressId ?
//                 <TouchableOpacity onPress={this.deleteAddress.bind(this)} style={[styles.inputWrapper, {paddingHorizontal: constants.SPACE_STANDARD, marginTop: constants.SPACE_LARGE, flex: 1, flexDirection: 'row', justifyContent: 'center', 'alignItems': 'center'}]}>
//                   <Text style={{fontFamily: constants.FONT_SEMIBOLD, fontSize: 16, color: '#ff5500'}}>Delete address</Text>
//                 </TouchableOpacity> : null
//               }

//             </View>
//           </View>
//         </ScrollView>
//         {
//           showCompleteButton && this.state.formComplete && !this.state.currentFocus ?
//           <BottomButton onScreen={true} title={'Add Address'} onPress={this.submit.bind(this)} /> : null
//         }
//       </View>
//     )
//   }

//   addErrorStyling(address, key) {
//     return _.get(address[key], 'error') &&  _.get(address[key], 'dirty') ? styles.inputError : {};
//   }

//   renderPredictions() {
//     return (
//       <View style={styles.predictionsWrapper}>
//         {
//           _.map(this.state.predictions, (prediction, i) => {
//             return (
//               <View key={'prediction-'+i} style={styles.prediction}>
//                 <TouchableOpacity style={styles.predictionContent} onPress={this.searchGooglePlaces.bind(this, prediction.place_id)}>
//                   <Wtext numberOfLines={1}>{prediction.description}</Wtext>
//                 </TouchableOpacity>
//               </View>
//             )
//           })
//         }
//       </View>
//     )
//   }

//   updateInput(key, val) {
//     const address = _.cloneDeep(this.props.newAddress);
//     const obj = address[key] || {};

//     if (key === 'zipcode') {
//       this.zipcodeChanged(val);
//     } else if (key === 'phone') {
//       val = this.formatPhoneNumber(val)
//     } else if(key === 'street_line_1') {
//       this.debounceGoogleSearch(val)
//     }
//     _.assign(obj, {value: val});
//     actions.setAddressValue(key, obj);
//   }

//   onInputBlur(key, clearPredictions) {
//     const address = _.cloneDeep(this.props.newAddress);
//     _.assign(address[key], {dirty: true});
//     actions.setAddressValue(key, address[key]);
//     this.setState({currentFocus: null});
//     if (clearPredictions === 'clearPredictions') {
//       this.clearPredictions();
//     }

//     this.scrollView.scrollTo({y: 0});
//   }

//   onInputFocus(label) {
//     this.setState({currentFocus: label});
//   }

//   formatPhoneNumber(val) {
//     return val.replace(/^(\d{3})(\d)/, '$1-$2').replace(/^(\d{3}-\d{3})(\d)/, '$1-$2');
//   }

//   // Google Api Address Lookup
//   async googleAutoComplete(value) {
//     const predictions = await actions.queryGoogleAutoComplete(value);
//     this.setState({predictions})
//   }

//   async searchGooglePlaces(id) {
//     const place = await actions.placeDetails(id);
//     let address;
//     if (place) {
//       address = _.cloneDeep(this.props.newAddress)
//       _.forEach(place, (value, key) => {
//         address[key] = {value}
//       })
//      actions.setAllAddressValues(address);
//      this.clearPredictions()
//      this.refs.street_line_2.focus()
//     }
//   }

//   clearPredictions() {
//     this.setState({predictions: []});
//   }


//   // Zip code city and state lookup
//   async zipcodeChanged(zipcode) {
//     if (zipcode && this.lastZip !== zipcode && zipcode.match(new RegExp(zipCodeEscapedPattern))) {
//       this.lastZip = zipcode;
//       try {
//         const location = await actions.locationRequested(zipcode);
//         if (location.city && location.state) {
//           actions.addLocationToAddress(location);
//           this.refs.phone.focus();
//         } else {
//           this.lastZip = zipcode;
//           this.removeLocationinfo();
//         }
//       } catch(e) {
//         this.lastZip = zipcode;
//         this.removeLocationinfo();
//       }
//     } else {
//       this.removeLocationinfo();
//     }
//   }

//   removeLocationinfo() {
//     actions.removeLocationFromAddress();
//     this.lastZip = null;
//   }


//   submit() {
//     const formattedAddress = this.getFormattedAddress()
//     this.props.submitShippingAddress(formattedAddress);
//   }

//   getFormattedAddress() {
//     const newAddress = this.props.newAddress;
//     const formattedAddress = _.reduce(newAddress, (accum, value, key) => {
//       accum[key] = value.value;
//       return accum;
//     }, {})
//     return formattedAddress
//   }

//   deleteAddress() {
//     this.props.deleteAddress(this.state.editAddressId);
//   }


//   componentWillUnmount() {
//     if (this.state.editAddressId) {
//       actions.resetNewShippingAddress();
//     }
//   }
// }







// const styles = StyleSheet.create({
//   formWrapper: {

//   },
//   textInput: {
//     fontSize: 16,
//     paddingHorizontal: constants.SPACE_STANDARD,
//     flex: 1,
//     height: constants.ROW_HEIGHT,
//     color: constants.COLOR_DARKBLUE,
//     fontFamily: constants.FONT_SEMIBOLD
//   },
//   inputGroup: {
//     flex:1,
//     flexDirection: 'row',
//     height: constants.ROW_HEIGHT
//   },
//   inputWrapper: {
//     flex:1,
//     borderBottomWidth: 1,
//     borderBottomColor: constants.COLOR_MERCURY,
//     height: constants.ROW_HEIGHT,
//     position: 'relative',
//     backgroundColor: '#fff',
//   },
//   inputError: {
//     color: 'red'
//   },
//   location: {
//     position: 'absolute',
//     right: constants.SPACE_STANDARD,
//     top: constants.SPACE_STANDARD + 2,
//     color: constants.COLOR_SILVER,
//     fontSize: 16,
//     fontFamily: constants.FONT_REGULAR

//   },

//   predictionsWrapper: {
//     position: 'absolute',
//     right: 0,
//     left: 0,
//     top: constants.ROW_HEIGHT,
//     bottom: 0,
//   },
//   prediction: {
//     height: constants.ROW_HEIGHT,
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     backgroundColor: '#fff',
//     borderBottomColor: constants.COLOR_ALUMINUM
//   },
//   predictionContent: {
//     height: constants.ROW_HEIGHT,
//     paddingHorizontal: constants.SPACE_STANDARD,
//     alignItems: 'flex-start',
//     justifyContent: 'center'
//   }
// })

// export default ShippingAddressForm;

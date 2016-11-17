import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, TouchableWithoutFeedback } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import tree from '../state/StateTree';
import styles from '../styles/formStyles';
import _ from 'lodash';
const browser = tree.select('browser');

const zipCodeEscapedPattern = '^[0-9]{5}(?:-[0-9]{4})?$';
const phoneNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;


export default function formHigherOrder(Comp, schema) {

  class formHO extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        outputData: {}
      }
    }

    componentDidMount() {
      // this.validateForm(this.props.newAddress);
    }

    componentWillUpdate(nextProps, nextState) {
      if (!_.isEqual(nextState.outputData, this.state.outputData)) {
        this.validateForm(nextState.outputData);
      }
    }

    setDataOnForm(data) {
      this.setState({
        outputData: data
      })
    }

    render() {
      return <Comp
      outputData={this.state.outputData}
      validateForm={this.validateForm.bind(this)}
      setInputValidation={this.setInputValidation.bind(this)}
      dismissKeyboard={this.dismissKeyboard.bind(this)}
      addErrorStyling={this.addErrorStyling.bind(this)}
      updateInput={this.updateInput.bind(this)}
      onInputBlur={this.onInputBlur.bind(this)}
      onInputFocus={this.onInputFocus.bind(this)}
      setDataOnForm={this.setDataOnForm.bind(this)}
      getData={this.getData.bind(this)}
      formComplete={this.state.formComplete}
      {...this.props} />;
    }

    validateForm(formData) {
      formData = _.cloneDeep(formData);
      let formValid = true;
      _.map(schema, (value, key) => {
        const inputValue = _.get(formData[key], 'value');
        let valid;
        if (!inputValue && value.required === false) {
          return true
        }

        if (value.regex && inputValue) {
          valid = !!inputValue.toString().match(value.regex)
          valid = _.has(value, 'regexResult') ? value.regexResult === valid : valid;
        } else if (value.testFunc && inputValue) {
          valid = value.testFunc(inputValue)
        } else {
          valid = !!inputValue
        }
        if (!valid && formValid) {
          formValid = false
        }

        this.setInputValidation(key, valid, formData)
        return valid
      })

      if (this.state.formComplete !== formValid) {
        this.setState({
          formComplete: formValid
        })
      }
      if (formValid && this.state.currentFocus === 'phone') {
        this.dismissKeyboard();
      }
      if (this.onValid) {
        this.onValid(formValid)
      }
    }

    setInputValidation(key, valid, formData) {
      if (formData[key]) {
        _.assign(formData[key], {error: !valid});
        this.setState({
          outputData: formData
        })
      }
    }

    dismissKeyboard(e) {
      dismissKeyboard();
    }

    addErrorStyling(formData, key) {
      return _.get(formData[key], 'error') &&  _.get(formData[key], 'dirty') ? styles.inputError : {};
    }

    updateInput(key, value) {
      const outputData = _.cloneDeep(this.state.outputData)
      outputData[key] = outputData[key] || {};

      if (key === 'price') {
        // value = formatCurrency(Number(value));
      }

      value = schema && _.get(schema[key], 'format') ? schema[key].format(value) : value;

      _.assign(outputData[key], {value: value});
      this.setState({
        outputData: outputData
      })
    }

    onInputBlur(key) {
      const outputData = _.cloneDeep(this.state.outputData);
      _.assign(outputData[key], {dirty: true});
      this.setState({currentFocus: null, outputData: outputData});
      
    }

    onInputFocus(label) {
      this.setState({currentFocus: label});
    }

    getData() {
      return  _.reduce(this.state.outputData, (result, field, key) => {
        result[key] = field.value;
        return result
      }, {});
    }

  }

  return formHO;
}


function formatCurrency(num) {
    var p = num.toFixed(2).split(".");
    return "Php " + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}


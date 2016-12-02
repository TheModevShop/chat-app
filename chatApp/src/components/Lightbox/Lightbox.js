'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import {closeLightBox} from '../../actions/ModalActions';
import ConfirmationErrorLightBox from './Lightboxes/ConfirmationErrorLightBox.js';
import CompleteUserProfile from './Lightboxes/CompleteUserProfile.js';
import ConfirmBookSession from './Lightboxes/ConfirmBookSession.js';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modalbox';

import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions
} from 'react-native';
var WINDOW_WIDTH = Dimensions.get('window').width;

class Lightbox extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.rendered && !this.state.initialRender && _.get(nextProps, 'lightBox.type')) {
      this.setState({isOpen: true, in: true, rendered: true})
    }
  }

  render() { 
    const type = _.get(this.props, 'lightBox.type');
    const data = _.get(this.props, 'lightBox.data');
    var BContent = <TouchableHighlight onPress={this.onClose.bind(this)}><Text>X</Text></TouchableHighlight>;
    return (
      type === 'confirmationErrorLightBox' ?
      <Modal isOpen={this.state.isOpen} onClosed={this.onClose.bind(this)} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
        <ConfirmationErrorLightBox/>
      </Modal> : 
      type === 'completeUserProfile' ?
      <Modal isOpen={this.state.isOpen} onClosed={this.onClose.bind(this)} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
        <CompleteUserProfile/>
      </Modal>  :
      type === 'confirmBookSession' ?
      <Modal isOpen={this.state.isOpen} onClosed={this.onClose.bind(this)} style={[styles.modal, styles.modal5]} position={"center"} backdropContent={BContent}>
        <ConfirmBookSession close={this.onClose.bind(this)} booking={data}/>
      </Modal>  : null
    ) 
  }

  toggleDisable() {
    this.setState({isDisabled: !this.state.isDisabled});
  }

  toggleSwipeToClose() {
    this.setState({swipeToClose: !this.state.swipeToClose});
  }

  onClose() {
    closeLightBox();
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: 300,
    width: WINDOW_WIDTH - 50,
    borderRadius: 5
  },

  modal5: {
    height: 400,
    width: WINDOW_WIDTH - 50,
    borderRadius: 5
  }
  
});

export default branch(Lightbox, {
  cursors: {
    lightBox: ['lightBox']
  }
});
'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import {closeModal} from '../../actions/ModalActions';
import BookSessionModal from './Modals/BookSessionModal.js';
import * as Animatable from 'react-native-animatable';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

class Modal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initialRender: false
    };
    this.outterAnimation = 'fadeIn';
    this.innerAnimation = 'slideInUp';

    this.outterDelay = 0;
    this.innerDelay = 0;
  }

  componentWillReceiveProps(nextProps) {
    console.log(_.get(nextProps, 'modal.type'))
    if (!this.state.rendered && !this.state.initialRender && _.get(nextProps, 'modal.type')) {
      this.setState({initialRender: true, in: true, rendered: true})
    }
  }

  render() {
    console.log(this.outterDelay)
    return (
      this.state.initialRender ?
      <View style={styles.wrapper}>
        <Animatable.View animation={this.outterAnimation} duration={200} delay={this.outterDelay} style={styles.container}></Animatable.View> 
        <Animatable.View onAnimationEnd={this.onAnimationEnd.bind(this, 'ENDNDDNDNED')} animation={this.innerAnimation} duration={500} delay={this.innerDelay} style={styles.inner}>
          <TouchableHighlight onPress={this.closeModal.bind(this)}><Text>Close</Text></TouchableHighlight>
          {this.renderInnerModal()}
        </Animatable.View>
      </View>: null
    );
  }

  renderInnerModal() {
    const modalData = this.props.modal || {};
    if (modalData.type = 'bookSessionModal') {
      return <BookSessionModal />
    }
  }

  closeModal() {
    this.outterAnimation = 'fadeOut';
    this.innerAnimation = 'slideOutDown';
    this.outterDelay = 0;
    this.innerDelay = 0;
    this.setState({
      in: false
    }, () => {
      closeModal();
    })
  }

  onAnimationEnd(d) {
    if (!this.state.in) {
      this.outterAnimation = 'fadeIn';
      this.innerAnimation = 'slideInUp';
      this.outterDelay = 0;
      this.innerDelay = 0;
      this.setState({
        initialRender: false
      })
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10
  },
  inner: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,    
    backgroundColor: '#fff',
    zIndex: 11
  }
});

export default branch(Modal, {
  cursors: {
    modal: ['modal']
  }
});
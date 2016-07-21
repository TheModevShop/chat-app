import React, { Component } from 'react';
import { View, StyleSheet, ListView, RefreshControl, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash'
import NavBar from '../../components/NavBar/NavBar'
import * as constants from '../../styles/styleConstants'
import FixedButton from '../../components/FixedButton/FixedButton';
import Icon from 'react-native-vector-icons/Ionicons';

class PaymentMethodList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      refreshing: false,
      loading: null
    };
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const paymentMethods = _.get(props, 'paymentMethods', []);
    if (paymentMethods.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        paymentMethods: ds.cloneWithRows(paymentMethods),
      });
    }
  }

  render() {
    const loading = _.get(this.props, 'paymentMethods.$isLoading');
    return (
      <View style={{flex: 1, backgroundColor: constants.SILVER}}>
        {
        loading && !_.get(this.props, 'paymentMethods.items.length') ?
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            style={[{height: 30}]}
            size="small" /> 
        </View> :
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              tintColor={constants.DARKBLUE}
            />
          }
          scrollsToTop={true}
          keyboardShouldPersistTaps={true}
          enableEmptySections={true}
          style={styles.addressList}
          initialListSize={10}
          dataSource={this.state.paymentMethods}
          renderRow={this.renderRow.bind(this)} />
        }

        <FixedButton style={{backgroundColor: constants.DARKGRAY}} onScreen={true} title={'Add New Payment Method'} onPress={() => {}} />
        <NavBar title='Payment Methods' />
      </View>
    )
  }
  
  async onRefresh() {
    this.setState({refreshing: true});
    await actions.invalidateAddressCacheAndFetch();
    this.setState({refreshing: false});
  }


  renderRow(card, section, row) {
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity onPress={card.default ? null : this.onSetDefault.bind(this, card)} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.cardInnerWrapper}>
            <Text>Card</Text>
          </View>
          <View style={styles.defaultWrapper}>
            {
              card.default ?
              <Icon name={'ios-checkmark-circle-outline'} size={25} color="#ccc" /> :
              <View style={styles.row}>
                {
                  this.state.loading === card.id ?
                  <ActivityIndicator
                    animating={true}
                    style={[{height: 30}]}
                    size="small"
                  /> : null
                }
              </View>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  
  async onSetDefault(address) {
    this.setState({loading: card.id}, async () => {
      this.registerList(this.props)
      // const setDefault = await actions.setDefaultShippingAddress(card.id);
      this.setState({loading: null});
    })
  }

  onEditAddress() {

  }

}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: constants.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  cardInnerWrapper: {
    padding: constants.SPACE_STANDARD,
  },
  addressList: {
    marginTop:  constants.NAVBAR_TOTAL_HEIGHT,
    marginBottom: 52
  },
  defaultWrapper: {
    padding: constants.SPACE_STANDARD,
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})



export default branch({
  paymentMethods: ['paymentMethods']
}, PaymentMethodList)
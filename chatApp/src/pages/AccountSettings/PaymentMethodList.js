import React, { Component } from 'react';
import { View, StyleSheet, ListView, RefreshControl, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash'
import NavBar from '../../components/NavBar/NavBar'
import * as constants from '../../styles/styleConstants'
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
      <View style={{flex: 1}}>
        {
        loading && !_.get(this.props, 'paymentMethods.items.length') ?
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator /> 
        </View> :
        <ListView
          style={styles.addressList}
          dataSource={this.state.paymentMethods}
          renderRow={this.renderRow.bind(this)} />
        }

        <NavBar title={'Payment Methods'} leftAction={this.props.goBack.bind(this)} />
      </View>
    )
  }
  
  async onRefresh() {
    this.setState({refreshing: true});
    // await actions.invalidateAddressCacheAndFetch();
    this.setState({refreshing: false});
  }


  renderRow(card, section, row) {
    card = _.get(card, 'card.card', {});
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity onPress={null} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.cardInnerWrapper}>
            <Text>{card.brand} ending in {card.last4} </Text>
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

}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: constants.WHITE,
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: '#ccc',
    height: constants.ROW_HEIGHT,
    justifyContent: 'center'
  },
  cardInnerWrapper: {
    padding: constants.SPACE_STANDARD,
  },
  addressList: {
    marginTop:  65
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


export default branch(PaymentMethodList, {
  cursors: {
    paymentMethods: ['facets', 'PaymentMethods']
  }
});

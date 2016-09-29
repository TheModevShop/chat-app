import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../actions/TeachAClassActions';
import moment from 'moment';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';
import formHigherOrder from '../../HigherOrder/formHigherOrder';
import buttonStyles from '../../styles/buttonStyle';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow';
import formStyles from '../../styles/formStyles';
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
  Easing
} from 'react-native';


class EquipmentRequired extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    const values = this.props.outputData || {};
    let items = _.get(this.props.teachAClassFlow, 'equipment', []);
    items = _.groupBy(items, 'provided');

    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 70, flex: 1}}>
          <Text>You will provide</Text>

          <View style={{marginTop: 70}}>
            <SectionHeader title="You will provide" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="ie. Violin, cello, didgeridoo, etc..."
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'provided')]}
                returnKeyType = {"done"}
                ref="provided"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'provided')}
                onBlur={this.props.onInputBlur.bind(this, 'provided')}
                onFocus={this.props.onInputFocus.bind(this, 'provided')}
                value={_.get(values, 'provided.value')}
                onSubmitEditing={(event) => {
                  console.log(event)
                  actions.addEquipmentNeededForService(_.get(values, 'provided.value'), true)
                }} />
            </View>
            {
              _.map(items.true, (equipment, i) => {
                return (
                  <FullTappableRow key={`provided-${i}`} hideIcon={true} title={equipment.item} onPress={() => {}} />
                );
              })
            }
          </View>


          <View style={{marginTop: 70}}>
            <SectionHeader title="Student must bring" />
            <View style={[formStyles.inputWrapper, {}]}>
              <TextInput
                placeholder="ie. Violin, cello, didgeridoo, etc..."
                style={[formStyles.textInput, this.props.addErrorStyling(values, 'mustBring')]}
                returnKeyType = {"done"}
                ref="mustBring"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={this.props.updateInput.bind(this, 'mustBring')}
                onBlur={this.props.onInputBlur.bind(this, 'mustBring')}
                onFocus={this.props.onInputFocus.bind(this, 'mustBring')}
                value={_.get(values, 'mustBring.value')}
                onSubmitEditing={(event) => {
                  actions.addEquipmentNeededForService(_.get(values, 'mustBring.value'), false)
                }} />
            </View>
            {
              _.map(items.false, (equipment, i) => {
                return (
                  <FullTappableRow key={`mustBring-${i}`} hideIcon={true} title={equipment.item} onPress={() => {}} />
                );
              })
            }
          </View>
          
          <Button cta="Create Service" disabled={false}  onPress={this.goToCategory.bind(this)} />

        </View>

        <NavBar title={'Equipment Required'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  goToCategory() {
    this.props.onNavigation({ type: 'push', key: 'ServiceOverview' })
  }

}


const makeComponent = _.flowRight(formHigherOrder, branch);
export default makeComponent(EquipmentRequired, {
  cursors: {
    user: ['user'],
    teachAClassFlow: ['teachAClassFlow']
  }
});
import {StyleSheet} from 'react-native';
import * as constants from './styleConstants';
export default StyleSheet.create({
  formWrapper: {

  },
  textInput: {
    fontSize: constants.FONT_DEFAULT,
    paddingHorizontal: constants.PADDING_STANDARD,
    flex: 1,
    height: constants.ROW_HEIGHT,
    maxHeight: constants.ROW_HEIGHT,
    color: constants.DARKBLUE,
    fontFamily: constants.FONT_SEMIBOLD
  },
  inputGroup: {
    flex:1,
    flexDirection: 'row',
    height: constants.ROW_HEIGHT
  },
  inputWrapper: {
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: constants.GRAY,
    borderTopWidth: 1,
    borderTopColor: constants.GRAY,
    height: constants.ROW_HEIGHT,
    maxHeight: constants.ROW_HEIGHT,
    position: 'relative',
    backgroundColor: '#fff',
  },
  inputError: {
    color: 'red'
  },
  
  location: {
    position: 'absolute',
    right: constants.PADDING_STANDARD,
    top: constants.PADDING_STANDARD + 2,
    color: constants.SILVER,
    fontSize: constants.FONT_DEFAULT,
    fontFamily: constants.FONT_REGULAR
  },

  predictionsWrapper: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: constants.ROW_HEIGHT,
    bottom: 0,
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

});


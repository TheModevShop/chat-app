import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  header: {
    height: 60,
    flex: 1
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#497ea6',
    padding: 20,
  },

  regularButton: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#497ea6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonDisabledText: {
    color: '#999',
  }
});
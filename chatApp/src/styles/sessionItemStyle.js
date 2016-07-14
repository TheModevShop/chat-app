import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000'
  },
  scrollWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 350
  },
  sessionWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  },
  sessionWrapperImage: {
    height: 60,
    width: 60,
    marginRight: 10,
    borderRadius: 120,
    overflow: 'hidden'
  },
  sessionWrapperContent: {

  }
});
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

export default class AddPhotoBanner extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        // if (Platform.OS === 'android') {
        //   source = {uri: response.uri, isStatic: true};
        // } else {
        //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // }

        this.setState({
          avatarSource: source
        });
        if (this.props.onImageLoad) {
          this.props.onImageLoad(source.uri);
        }
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  componentWillMount() {
    if (this.props.image) {
      const source = {uri: this.props.image, isStatic: true};
      this.setState({
        avatarSource: source
      });
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.selectPhotoTapped.bind(this)}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Add photo</Text>
        </View>
        {
          this.state.avatarSource ?
          <Image style={styles.avatar} source={this.state.avatarSource} /> : null
        }
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
   flex: 1,
   position: 'relative',
   maxHeight: 200,
   height: 200,
   backgroundColor: "#ccc"
 },
  titleWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 12
  },
  avatar: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

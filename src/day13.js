/**
 * Day 13
 * A twitter tweet UI
 */
'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class FunctionView extends Component {
  static defaultProps = {
    numOfText: 140,
  };

  static propTypes = {
    numOfText: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    const fetchParams = {
      first: 4,
    };
    // CameraRoll.getPhotos(fetchParams).done(
    //   (data) => this.storeImages(data),
    //   (err) => this.logImageError(err),
    // );
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    return (
      <View style={styles.functionContainer}>
        <View style={styles.functionIconContainer}>
          <View style={styles.functionIcon}>
            <Icon name="ios-pin" size={23} color="#8899a5" />
            <Icon name="md-camera" size={23} color="#8899a5" />
            <Icon name="md-image" size={23} color="#8899a5" />
            <Icon name="md-pie" size={23} color="#8899a5" />
          </View>
          <View style={styles.functionBtn}>
            <Text style={styles.text}>{this.props.numOfText}</Text>
            <TouchableHighlight
              style={this.props.numOfText === 140 ? styles.btn : styles.activeBtn}>
              <Text style={this.props.numOfText === 140 ? styles.btnText : styles.activeBtnText}>
                发推
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.imageGrid}>
          <View style={styles.imageIcon}>
            <Icon name="ios-camera" size={80} color="#2aa2ef" />
          </View>
          <View style={styles.imageIcon}>
            <Icon name="ios-videocam" size={80} color="#2aa2ef" />
          </View>
          {this.state.images.map((image, index) => (
            <View key={index} style={styles.imageIcon}>
              <Image style={styles.image} source={{ uri: image.uri }} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default class extends Component {
  constructor() {
    super();
    this.state = {
      numOfText: 140,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  _updateTextNum(text) {
    let remain = 140 - text.length;
    this.setState({
      numOfText: remain,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={require('./img/icon.png')} />
          <Icon name="md-close" color="#2aa2ef" size={25} />
        </View>
        <TextInput
          ref="textarea"
          style={styles.textArea}
          maxLength={140}
          multiline={true}
          placeholder="有什么新鲜事？"
          selectionColor="#2aa2ef"
          placeholderTextColor="#ced8de"
          onChangeText={(text) => this._updateTextNum(text)}
        />
        <FunctionView numOfText={this.state.numOfText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: Util.size.height,
    backgroundColor: '#ffffff',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  iconContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textArea: {
    height: 335,
    padding: 15,
    fontSize: 20,
  },
  functionContainer: {
    height: 275,
    width: 375,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopWidth: 1,
    borderTopColor: '#a0adb7',
  },
  functionIconContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccd6dd',
  },
  functionIcon: {
    width: 210,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  functionBtn: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    height: 35,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#ccd6dd',
    borderWidth: 1,
  },
  activeBtn: {
    height: 35,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#2aa2ef',
  },
  text: {
    color: '#ccd6dd',
    fontSize: 18,
  },
  btnText: {
    color: '#ccd6dd',
    fontSize: 14,
  },
  activeBtnText: {
    color: '#fff',
    fontSize: 14,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageIcon: {
    width: Util.size.width / 3,
    height: 113,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ddd',
    borderBottomColor: '#ddd',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  image: {
    width: Util.size.width / 3,
    height: 113,
  },
});

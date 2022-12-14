/**
 * Day 5
 * find my location
 */
'use strict';

import React, { Component } from 'react';
import {
  Platform,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
// import { MapView, MapType } from 'react-native-amap3d';
import MapView from 'react-native-maps';
// import { AMapSdk } from 'react-native-amap3d';

// AMapSdk.init(
//   Platform.select({
//     android: 'c901fa50b997ac894994010d5968691f',
//   }),
// );
export class Map extends Component {
  static defaultProps = {
    mapType: 'standard',
    showsUserLocation: false,
    followUserLocation: false,
  };

  static propTypes = {
    mapType: PropTypes.oneOf(['standard', 'satellite', 'hybrid']),
    // mapStyle: View.PropTypes.style,
    showsUserLocation: PropTypes.bool.isRequired,
    followUserLocation: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      annotations: [],
    };
  }

  _getAnnotations(region) {
    return [
      {
        longitude: region.longitude,
        latitude: region.latitude,
        title: 'You Are Here',
      },
    ];
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {/* <MapView
          style={{ flex: 1 }}
          mapType={MapType.Satellite}
          myLocationEnabled
          myLocationButtonEnabled
          followUserLocation={this.props.followUserLocation}
          initialCameraPosition={{
            target: {
              latitude: 39.91095,
              longitude: 116.37296,
            },
            zoom: 8,
          }}
        /> */}
      </View>
    );
  }
}

export default class extends Component {
  constructor() {
    super();
    this.state = {
      showGeo: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(0);
    }
  }

  _getLocation() {
    this.setState({
      showGeo: true,
    });
  }

  render() {
    return (
      <View>
        <Map
          mapTyle="standard"
          showsUserLocation={this.state.showGeo}
          followUserLocation={this.state.showGeo}
        />

        <TouchableHighlight
          underlayColor="#00bd03"
          style={styles.btn}
          onPress={() => this._getLocation()}>
          <Text style={styles.btnText}>
            <Icon size={18} name="md-navigate">
              {' '}
            </Icon>{' '}
            Find my location
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // paddingTop: 60,
  },
  map: {
    width: Util.size.width,
    height: Util.size.height - 120,
  },
  btn: {
    backgroundColor: '#00a803',
    width: Util.size.width - 80,
    height: 40,
    borderWidth: Util.pixel,
    borderColor: '#009302',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});

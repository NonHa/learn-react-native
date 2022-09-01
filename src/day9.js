/**
 * Day 9
 *
 */
'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  PanResponder,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class TwitterUser extends Component {
  constructor() {
    super();
    this.state = {
      scrollEnabled: false,
      scale: 1,
      iconTop: 95,
      bannerTop: 0,
      opacity: 0,
      selectTabIndex: 0,
    };
  }

  _scrollEnabled = false;
  _previousTop = 0;
  _iconTop = 95;
  _scale = 1;
  _bannerTop = 0;
  _opacity = 0;
  _minTop = -192;
  _userStyle = {};
  user = { setNativeProps: null };

  _updatePosition() {
    this.user && this.user.setNativeProps(this._userStyles);
  }

  _endMove(evt, gestureState) {
    this._previousTop = this._userStyles.style.top;
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy / gestureState.dx != 0;
      },
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        this._userStyles.style.top = this._previousTop + gestureState.dy;
        this._scale = 1 + this._userStyles.style.top / 162.5;
        this._iconTop = 95 - this._userStyles.style.top / 4.16;
        this._bannerTop = 0;
        this._opacity = 0;
        // this._scrollEnabled = false;
        if (this._userStyles.style.top < -62.5) {
          this._scale = 0.6;
          this._iconTop = 110;
          this._bannerTop = -this._userStyles.style.top - 62.5;
          this._opacity = Math.pow((-this._userStyles.style.top - 62.5) / 129.5, 0.5);
        }
        if (this._userStyles.style.top > 0) {
          this._userStyles.style.top = 0;
          this._scale = 1;
          this._iconTop = 95;
        }
        if (this._userStyles.style.top < this._minTop) {
          this._userStyles.style.top = this._minTop;
          this._opacity = 1;
          this._bannerTop = 129.5;
          // this._scrollEnabled = true;
        }

        this.setState({
          // scrollEnabled: this._scrollEnabled,
          scale: this._scale,
          iconTop: this._iconTop,
          bannerTop: this._bannerTop,
          opacity: this._opacity,
        });

        this._updatePosition();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });

    this._userStyles = {
      style: {
        top: this._previousTop,
      },
    };
  }

  componentDidMount() {
    this._updatePosition();
  }
  tabPress(index) {
    console.log('index', index);
    this.setState({
      selectTabIndex: index,
    });
  }
  render() {
    let panProps = this.state.scrollEnabled ? {} : { ...this._panResponder.panHandlers };
    return (
      <View
        ref={(user) => {
          this.user = user;
        }}
        style={styles.userContainer}
        {...panProps}>
        <View style={styles.userPanel}>
          <Image
            style={[styles.banner, { top: this.state.bannerTop }]}
            source={require('./img/banner.png')}
          />
          <View
            style={[
              styles.iconContainer,
              { top: this.state.iconTop, transform: [{ scale: this.state.scale }] },
            ]}>
            <Image style={styles.icon} source={require('./img/icon.png')} />
          </View>
          <View style={styles.userControl}>
            <TouchableHighlight style={styles.controlIcon}>
              <Icon name="ios-settings" color="#8999a5" size={20} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.controlBtn}>
              <Icon name="ios-people" color="#8999a5" size={20} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.controlBtn2}>
              <Text style={styles.controlBtnText}>编辑个人资料</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoName}>Github</Text>
            <Text style={styles.userInfoAccount}>@Github</Text>
            <View style={styles.userInfoFollow}>
              <Text style={styles.userInfoFollowing}>
                <Text style={styles.fontEm}>183</Text> 正在关注
              </Text>
              <Text style={styles.userInfoFollower}>
                <Text style={styles.fontEm}>830k</Text> 关注者
              </Text>
            </View>
          </View>
          {this.state.bannerTop <= 0 ? (
            <View />
          ) : (
            <Image
              style={[styles.banner, { top: this.state.bannerTop }]}
              source={require('./img/banner.png')}
            />
          )}
          {this.state.bannerTop <= 0 ? (
            <View />
          ) : (
            <Image
              style={[styles.banner, { top: this.state.bannerTop, opacity: this.state.opacity }]}
              source={require('./img/bannerBlur.png')}
            />
          )}
          <Text
            style={{
              position: 'absolute',
              left: Util.size.width / 2 - 30,
              fontSize: 20,
              fontWeight: '500',
              top: this.state.bannerTop + 90,
              opacity: this.state.opacity,
              backgroundColor: 'transparent',
              color: '#fff',
            }}>
            Github
          </Text>
          <View style={styles.segment}>
            <Text
              onPress={() => this.tabPress(0)}
              style={[
                styles.segmentItem,
                this.state.selectTabIndex === 0 ? styles.select_segmentItem : null,
              ]}>
              推文
            </Text>
            <Text
              onPress={() => this.tabPress(1)}
              style={[
                styles.segmentItem,
                this.state.selectTabIndex === 1 ? styles.select_segmentItem : null,
              ]}>
              媒体
            </Text>
            <Text
              onPress={() => this.tabPress(2)}
              style={[
                styles.segmentItem,
                this.state.selectTabIndex === 2 ? styles.select_segmentItem : null,
              ]}>
              喜欢
            </Text>
          </View>
        </View>
        <ScrollView
          contentInset={{ top: 0 }}
          style={styles.detailScroll}
          scrollEnabled={this.state.scrollEnabled}>
          <View style={{ width: Util.size.width, backgroundColor: '#f5f8fa' }}>
            <Image
              style={{
                width: Util.size.width,
                height: 0.835 * Util.size.width,
                resizeMode: 'contain',
              }}
              source={require('./img/moreinfo.png')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Tab = createBottomTabNavigator();

class TwitterTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '我',
    };
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  render() {
    return (
      <Tab.Navigator barTintColor="#fff" tintColor="#1b95e0">
        <Tab.Screen
          name="主页"
          onPress={() => this.changeTab('主页')}
          selected={this.state.selectedTab === '主页'}
          component={TwitterUser}
          options={{
            tabBarIcon: (props) => (
              <Icon name="ios-home-outline" color={props.color} size={props.size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="通知"
          onPress={() => this.changeTab('通知')}
          selected={this.state.selectedTab === '通知'}
          component={TwitterUser}
          options={{
            tabBarIcon: (props) => (
              <Icon name="ios-notifications-outline" color={props.color} size={props.size} />
            ),
          }}
        />
        <Tab.Screen
          name="私信"
          onPress={() => this.changeTab('私信')}
          selected={this.state.selectedTab === '私信'}
          component={TwitterUser}
          options={{
            tabBarIcon: (props) => (
              <Icon name="ios-mail-outline" color={props.color} size={props.size} />
            ),
          }}
        />
        <Tab.Screen
          name="我"
          onPress={() => this.changeTab('我')}
          selected={this.state.selectedTab === '我'}
          component={TwitterUser}
          options={{
            tabBarIcon: (props) => (
              <Icon name="ios-person-outline" color={props.color} size={props.size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default class extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <View style={styles.twitterContainer}>
        <TwitterTab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: '#fff',
  },
  twitterContainer: {
    width: Util.size.width,
    height: Util.size.height,
    backgroundColor: '#f5f8fa',
  },
  userContainer: {
    width: Util.size.width,
    height: Util.size.height - 50,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  detailScroll: {
    position: 'absolute',
    top: 320,
    backgroundColor: '#f5f8fa',
    width: Util.size.width,
    height: Util.size.height - 350,
    left: 0,
    borderTopWidth: Util.pixel,
    borderTopColor: '#9eacb6',
  },
  userPanel: {
    flex: 1,
    paddingBottom: 20,
  },
  banner: {
    width: Util.size.width,
    height: 125,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
    top: 95,
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 5,
  },
  icon: {
    width: 68,
    height: 68,
  },
  userControl: {
    height: 55,
    position: 'absolute',
    top: 125,
    width: 200,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlBtn: {
    borderColor: '#8999a5',
    borderWidth: 1,
    paddingTop: 3,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingRight: 5,
    borderRadius: 3,
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn2: {
    borderColor: '#8999a5',
    borderWidth: 1,
    paddingTop: 3,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingRight: 5,
    borderRadius: 3,
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: {
    width: 30,
  },
  controlBtnText: {
    color: '#8999a5',
    fontSize: 14,
  },
  userInfo: {
    width: Util.size.width,
    position: 'absolute',
    top: 165,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    left: 0,
    height: 90,
  },
  userInfoName: {
    color: '#292f33',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 5,
  },
  userInfoAccount: {
    color: '#66757f',
    paddingBottom: 5,
  },
  userInfoFollower: {
    color: '#95a4ae',
    width: 110,
  },
  userInfoFollowing: {
    color: '#95a4ae',
    width: 110,
  },
  userInfoFollow: {
    flexDirection: 'row',
  },
  fontEm: {
    color: '#292f33',
    fontWeight: '500',
  },
  segment: {
    position: 'absolute',
    top: 263,
    left: 0,
    flexDirection: 'row',
    height: 40,
    width: Util.size.width - 80,
    flex: 1,
    color: '#fff',
    marginLeft: 40,
    borderRadius: 5,
    borderColor: '#1b95e0',
    borderStyle: 'solid',
    borderWidth: 4,
  },
  segmentItem: {
    flex: 1,
    width: 20,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 40,
    color: '#1b95e0',
  },
  select_segmentItem: {
    backgroundColor: '#1b95e0',
    color: '#fff',
  },
});

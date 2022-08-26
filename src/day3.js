/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React, { Component } from 'react';
import {
  Platform,
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Util from './utils';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import createReactClass from 'create-react-class';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackDom = () => {
  return (
    <View>
      <Text>345</Text>
    </View>
  );
};
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const Tab = createBottomTabNavigator();
class Entrance extends Component {
  static propTypes = {
    hideThis: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      transformAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.transformAnim, {
      toValue: 50,
      duration: 1200,
      delay: 2000,
      easing: Easing.elastic(2),
    }).start();
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.elastic(1),
      delay: 2200,
    }).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);
  }

  render() {
    return (
      <Animated.View style={[styles.entrance, { opacity: this.state.opacityAnim }]}>
        <AnimatedIcon
          size={60}
          style={[styles.twitter, { transform: [{ scale: this.state.transformAnim }] }]}
          name="logo-twitter"
        />
      </Animated.View>
    );
  }
}

class TwitterPost extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._onRefresh()}
            tintColor="#ddd"
            progressViewOffset={50}
          />
        }>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Image
            source={require('./img/day3.png')}
            style={{ width: Util.size.width, height: Util.size.height }}
          />
        </View>
      </ScrollView>
    );
  }
}

class TwitterFlow extends Component {
  render() {
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <View>
            <View style={styles.navBg} />
            <View style={styles.navAndroid}>
              <View style={styles.logoContainer}>
                <Icon name="logo-twitter" color="#fff" size={27} />
                <Text style={styles.title}>{this.state.title}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name="ios-search" color="#fff" size={25} />
                <Icon name="ios-create-outline" color="#fff" size={25} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.nav}>
            <View style={styles.navLeft}>
              <Icon name="ios-person-add" size={23} style={{ color: '#1b95e0', paddingLeft: 10 }} />
            </View>
            <View style={styles.navMid}>
              <Icon name="logo-twitter" size={27} style={{ color: '#1b95e0' }} />
            </View>
            <View style={styles.navRight}>
              <Icon name="ios-search" size={23} style={{ color: '#1b95e0', width: 30 }} />
              <Icon
                name="ios-create-outline"
                size={23}
                style={{ color: '#1b95e0', width: 30, paddingRight: 10 }}
              />
            </View>
          </View>
        )}
        <TwitterPost />
      </View>
    );
  }
}

class TwitterTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '主页',
      title: '主页',
    };
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  _updateTitle(obj) {
    const { i } = obj;
    let title = '';
    switch (i) {
      case 0:
        title = '主页';
        break;
      case 1:
        title = '通知';
        break;
      case 2:
        title = '私信';
        break;
      case 3:
        title = '我';
        break;
    }
    this.setState({
      title,
    });
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Feeds"
          component={TwitterFlow}
          options={{
            title: '首页',
            tabBarIcon: (props) => (
              <Icon name="ios-home-outline" color={props.color} size={props.size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={StackDom}
          options={{
            title: '通知',
            tabBarIcon: (props) => (
              <Icon name="ios-notifications-outline" color={props.color} size={props.size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings2"
          component={StackDom}
          options={{
            title: '私信',
            tabBarIcon: (props) => (
              <Icon name="ios-mail-outline" color={props.color} size={props.size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings3"
          component={StackDom}
          options={{
            title: '我',
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
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(0);
    }
  }

  _hideEntrance() {
    this.setState({
      show: false,
    });
  }

  render() {
    let entrance = this.state.show ? <Entrance hideThis={() => this._hideEntrance()} /> : <View />;

    return (
      <View style={styles.twitterContainer}>
        <TwitterTab />
        {entrance}
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
  },
  entrance: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor: '#1b95e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitter: {
    color: '#fff',
    position: 'relative',
    top: -20,
    textAlign: 'center',
  },
  nav: {
    flexDirection: 'row',
    paddingTop: 15,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  navLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  navMid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  twitterPostContainer: {
    width: Util.size.width,
    height: Util.size.height - 90,
    position: 'relative',
    top: -20,
  },
  navAndroid: {
    backgroundColor: '#3195d7',
    width: Util.size.width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#111',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 35,
  },
  img: {
    width: 375,
    height: 550,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tabView: {
    flex: 1,
    height: 500,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

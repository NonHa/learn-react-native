/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'webgltexture-loader-expo-camera';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  LogBox,
  Platform,
} from 'react-native';
// import './rn-polyfill-depriated-proptypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';
import Index from './src/day1.js';
import Day2 from './src/day2';
import Day3 from './src/day3';
import Day5 from './src/day5';
import Day6 from './src/day6';
import Day7 from './src/day7';
import Day8 from './src/day8';
import Day9 from './src/day9';
import Day10 from './src/day10';
import Day11 from './src/day11';
import Day12 from './src/day12';
import Day13 from './src/day13';
import Util from './src/utils';

const Stack = createNativeStackNavigator();
const data = [
  {
    key: 0,
    title: 'A stopwatch',
    name: 'Day1',
    component: Index,
    isFA: false,
    icon: 'ios-stopwatch',
    size: 48,
    color: '#ff856c',
    hideNav: false,
  },
  {
    key: 1,
    title: 'A weather app',
    name: 'Day2',
    component: Day2,

    isFA: false,
    icon: 'partly-sunny',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 2,
    title: 'twitter',
    component: Day3,
    name: 'Day3',

    isFA: false,
    icon: 'logo-twitter',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 5,
    title: 'find my location',
    name: 'Day5',
    component: Day5,

    isFA: false,
    icon: 'location',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 6,
    title: 'find my location',
    name: 'Day6',
    component: Day6,

    isFA: true,
    icon: 'spotify',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 7,
    title: 'find my location',
    name: 'Day7',
    component: Day7,

    isFA: false,
    icon: 'ios-baseball',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 8,
    title: 'find my location',
    name: 'Day8',
    component: Day8,

    isFA: true,
    icon: 'google',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 9,
    title: 'find my location',
    name: 'Day9',
    component: Day9,

    isFA: false,
    icon: 'logo-tumblr',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 10,
    title: 'find my location',
    name: 'Day10',
    component: Day10,

    isFA: false,
    icon: 'md-contrast',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  {
    key: 11,
    title: 'find my location',
    name: 'Day11',
    component: Day11,

    isFA: true,
    icon: 'columns',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
  // {
  //   key: 12,
  //   title: 'find my location',
  //   name: 'Day12',
  //   component: Day12,

  //   isFA: true,
  //   icon: 'columns',
  //   size: 60,
  //   color: '#90bdc1',
  //   hideNav: true,
  // },
  {
    key: 13,
    title: 'find my location',
    name: 'Day13',
    component: Day13,

    isFA: true,
    icon: 'columns',
    size: 60,
    color: '#90bdc1',
    hideNav: true,
  },
];
const NavagationMain = function ({ navigation }) {
  const boxs = data.map(function (elem, index) {
    return (
      <TouchableHighlight
        key={elem.key}
        style={[styles.touchBox, index % 3 === 2 ? styles.touchBox2 : styles.touchBox1]}
        underlayColor="#eee"
        onPress={() => navigation.navigate(elem.name)}>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>{elem.name}</Text>
          {elem.isFA ? (
            <IconFA
              size={elem.size}
              name={elem.icon}
              style={[styles.boxIcon, { color: elem.color }]}
            />
          ) : (
            <Icon
              size={elem.size}
              name={elem.icon}
              style={[styles.boxIcon, { color: elem.color }]}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  });
  return (
    <ScrollView style={styles.mainView}>
      <Swiper
        height={150}
        showsButtons={false}
        autoplay={true}
        activeDot={
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }>
        <TouchableHighlight onPress={() => navigation.navigate('Day1')}>
          <View style={styles.slide}>
            <Image style={styles.image} source={require('./src/img/day1.png')} />
            <Text style={styles.slideText}>Day1: Timer</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('Day2')}>
          <View style={styles.slide}>
            <Image style={styles.image} source={require('./src/img/day2.png')} />
            <Text style={styles.slideText}>Day2: Weather</Text>
          </View>
        </TouchableHighlight>
      </Swiper>
      <View style={styles.touchBoxContainer}>{boxs}</View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NavagationMain">
        <Stack.Screen name="NavagationMain" options={{ title: 'NavagationMain' }}>
          {(props) => <NavagationMain {...props} />}
        </Stack.Screen>
        {data.map(function (v) {
          return (
            <Stack.Screen
              key={v.key}
              name={v.name}
              component={v.component}
              options={{ headerShown: !v.hideNav }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    // marginTop: 55,
  },
  slide: {
    flex: 1,
    height: 150,
  },
  slideText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: Util.size.width,
    textAlign: 'center',
    fontSize: 12,
  },
  image: {
    width: Util.size.width,
    height: 150,
  },
  touchBox: {
    width: Util.size.width / 3 - 0.33334,
    height: Util.size.width / 3,
    backgroundColor: '#fff',
  },
  touchBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor: '#ccc',
    borderLeftWidth: Util.pixel,
    borderLeftColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
  },
  touchBox1: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
  },
  touchBox2: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
    borderLeftWidth: Util.pixel,
    borderLeftColor: '#ccc',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Util.size.width / 3,
    height: Util.size.width / 3,
  },
  boxIcon: {
    position: 'relative',
    top: -10,
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
    width: Util.size.width / 3,
    textAlign: 'center',
    left: 0,
    backgroundColor: 'transparent',
  },
});
export default App;

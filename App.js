/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  IconFA,
  LogBox,
} from 'react-native';
// import './rn-polyfill-depriated-proptypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Swiper from 'react-native-swiper';
import Index from './src/index.js';
import Day2 from './src/day2';
import Day3 from './src/day3';
import Util from './src/utils';

const Stack = createNativeStackNavigator();

const NavagationMain = function ({ navigation }) {
  const data = [
    {
      key: 0,
      title: 'A stopwatch',
      component: 'Day1',
      isFA: false,
      icon: 'ios-stopwatch',
      size: 48,
      color: '#ff856c',
      hideNav: false,
    },
    {
      key: 1,
      title: 'A weather app',
      component: 'Day2',
      isFA: false,
      icon: 'partly-sunny',
      size: 60,
      color: '#90bdc1',
      hideNav: true,
    },
    {
      key: 2,
      title: 'twitter',
      component: 'Day3',
      isFA: false,
      icon: 'logo-twitter',
      size: 60,
      color: '#90bdc1',
      hideNav: true,
    },
  ];
  const boxs = data.map(function (elem, index) {
    return (
      <TouchableHighlight
        key={elem.key}
        style={[styles.touchBox, index % 3 === 2 ? styles.touchBox2 : styles.touchBox1]}
        underlayColor="#eee"
        onPress={() => navigation.navigate(elem.component)}>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Day{index + 1}</Text>
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
        <Stack.Screen name="Day1" component={Index} options={{ title: 'day1' }} />
        <Stack.Screen name="Day2" component={Day2} options={{ headerShown: false }} />
        <Stack.Screen name="Day3" component={Day3} options={{ headerShown: false }} />
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
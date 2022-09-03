/**
 * Day 15
 * pickerIOS, Modal
 */
'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, StatusBar, Text, TouchableHighlight, Modal, View } from 'react-native';
import Util from './utils';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
export default class extends Component {
  constructor() {
    super();

    const date = new Date();
    const time = this._getTime(date);
    const timeZoneOffsetInHours = (-1 * new Date().getTimezoneOffset()) / 60;
    let setDate = new Date();
    let showModal = false;

    this.state = { time, showModal, setDate, timeZoneOffsetInHours };
    this._setTime = this._setTime.bind(this);
    this._pickTime = this._pickTime.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  _getTime(date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate(),
      monthIndex = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();
    return (
      day +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year +
      ' at ' +
      (hour < 10 ? '0' + hour : hour) +
      ':' +
      (minute < 10 ? '0' + minute : minute)
    );
  }

  _pickTime() {
    DateTimePickerAndroid.open({
      value: this.state.setDate,
      onChange: this._setTime,
      mode: 'date',
      is24Hour: true,
    });
  }

  _setTime(e, data) {
    this.setState((state) => {
      return {
        setDate: new Date(e.nativeEvent.timestamp),
        time: this._getTime(new Date(e.nativeEvent.timestamp)),
        showModal: false,
      };
    });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _onDateChange(date) {
    this.setState({ setDate: date });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{this.state.time}</Text>
        <TouchableHighlight underlayColor="#f3f3f3" onPress={() => this._pickTime()}>
          <Text style={styles.btnText}>change time</Text>
        </TouchableHighlight>
        {/* <View style={styles.modalContent}>
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.setDate}
            maximumDate={new Date(2023, 10, 20)}
            mode={'date'}
            is24Hour={true}
            onChange={this._setTime}
            dateFormat="second"
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Util.size.height,
    width: Util.size.width,
    paddingBottom: 60,
    backgroundColor: '#ffffff',
  },
  date: {
    fontSize: 25,
  },
  btnText: {
    color: '#4285f4',
    fontSize: 16,
    paddingTop: 10,
  },
  modalContainer: {
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor: '#f1f1f1',
  },
  modalNav: {
    position: 'absolute',
    height: 60,
    width: Util.size.width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Util.size.width,
    height: Util.size.height - 60,
    marginTop: 600,
  },
  navTitle: {
    paddingTop: 8,
    fontWeight: '500',
    color: '#222',
    fontSize: 18,
  },
});

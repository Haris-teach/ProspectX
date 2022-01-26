import React, {Component, PureComponent} from 'react';
import {
  Clipboard,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Image,
  Text,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NotificationStyles from './styles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import images from '../../../assets/images/Images';

const PropTypes = require('prop-types');

class DetailRow extends PureComponent {
  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.onPress();
    this.props.onClose();
  }

  onSwipe = direction => {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP} = swipeDirections;
    if (
      direction === SWIPE_RIGHT ||
      direction === SWIPE_LEFT ||
      direction === SWIPE_UP
    ) {
      this.props.onClose();
    }
  };

  render() {
    let {title, message} = this.props;

    return (
      <View
        style={[
          {
            width: '100%',
            height: Platform.OS === 'ios' ? hp(15) : hp(10),
            position: 'absolute',
            top: 0,
            backgroundColor: 'black',
          },
        ]}>
        <GestureRecognizer
          onSwipe={this.onSwipe}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // backgroundColor: 'green',
          }}>
          <TouchableOpacity
            onPress={() => this.onPress()}
            style={[{flexDirection: 'row', backgroundColor: 'black'}]}>
            <View style={NotificationStyles.imageContainer}>
              <Image
                source={images.logo}
                style={NotificationStyles.imageStyle}
              />
            </View>
            <View style={NotificationStyles.textContainerStyle}>
              <Text
                style={[NotificationStyles.titleStyle, {color: 'white'}]}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {title}
              </Text>
              <Text
                style={[NotificationStyles.messageStyle, {color: 'white'}]}
                ellipsizeMode={'tail'}
                numberOfLines={2}>
                {' '}
                {message}
              </Text>
            </View>
          </TouchableOpacity>
        </GestureRecognizer>
      </View>
    );
  }
}
DetailRow.propTypes = {};
DetailRow.defaultProps = {};
export default DetailRow;

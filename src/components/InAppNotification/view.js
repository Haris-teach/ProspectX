import React, {Component} from 'react';
import {Animated, StatusBar, Vibration, View} from 'react-native';
import NotificationRow from './NotificationRow/view';
import {EventRegister} from 'react-native-event-listeners';
const PropTypes = require('prop-types');

class InAppNotification extends Component {
  closeIntervalRef = '';

  constructor(props) {
    super(props);

    this.state = {
      notificationData: '',
    };
  }

  componentDidMount() {
    EventRegister.addEventListener('InAppNotification', (remoteMessage) => {
      // console.log('remote In app' , remoteMessage);

      this.setState(
        {
          notificationData: remoteMessage,
        },
        () => {},
      );

      if (this.props.vibrate) {
        Vibration.vibrate();
      }

      if (this.closeIntervalRef !== '') {
        clearTimeout(this.closeIntervalRef);
        this.closeIntervalRef = '';
      }

      this.closeIntervalRef = setTimeout(() => {
        this.setState({
          notificationData: '',
        });
      }, this.props.interval);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('InAppNotification');
  }

  render() {
    let {onPress} = this.props;

    let {notificationData} = this.state;

    // console.log('notificationData =====>', notificationData);

    if (notificationData !== '') {
      return (
        <NotificationRow
          title={
            notificationData.notification && notificationData.notification.title
              ? notificationData.notification.title
              : ''
          }
          message={
            notificationData.notification && notificationData.notification.body
              ? notificationData.notification.body
              : ''
          }
          onPress={() => onPress(notificationData)}
          onClose={() => {
            this.setState({
              notificationData: '',
            });
          }}
        />
      );
    } else {
      return null;
    }
  }
}

InAppNotification.propTypes = {
  remoteMessage: PropTypes.object,
  onPress: PropTypes.func,
  vibrate: PropTypes.bool,
  interval: PropTypes.number,
};

InAppNotification.defaultProps = {
  remoteMessage: {},
  vibrate: false,
  interval: 5000,
};

module.exports = InAppNotification;

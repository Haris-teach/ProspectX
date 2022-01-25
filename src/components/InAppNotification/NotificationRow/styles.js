import {View, StyleSheet} from 'react-native';
// const commonStyles = AppConfig.styling.default;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NotificationStyles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: 100,
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  imageContainer: {
    width: '20%',
    height: '100%',
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: hp(7),
    height: hp(7),
  },
  textContainerStyle: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingVertical:hp(2)
  },
  titleStyle: {
    // fontSize: fonts.H5,
    fontWeight: 'bold',
  },
  messageStyle: {
    // fontSize: fonts.P3,
    // color:commonStyles.colors.GREY_DARK,
    fontStyle: 'italic',
    marginTop: hp(0.5),
  },
});

export default NotificationStyles;

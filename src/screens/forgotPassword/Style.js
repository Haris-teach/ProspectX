import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputViewStyle: {
    height: hp(20),
    paddingVertical: hp(2),
    justifyContent: 'space-between',
  },
  headerView: {
    paddingTop: Platform.OS == 'ios' ? hp(5) : null,
    height: hp(10),
    justifyContent: 'center',
    marginHorizontal: wp(6),
  },
  backArrowWidth: {
    width: wp(10),
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp(10),
  },
  resendCodeStyle: {
    alignSelf: 'center',
    paddingVertical: hp(3),
    fontFamily: fonts.semiBold,
    fontSize: wp(3.3),
    color: colors.likeBlackColor,
  },
  startView: {
    alignSelf: 'center',
  },
  descTextView: {
    width: wp(80),
  },
  descTextStyle: {
    color: 'rgba(129, 132, 162, 1)',
    fontSize: wp(3.5),
    marginHorizontal: wp(12),
    fontFamily: fonts.regular,
    marginVertical: hp(2),
  },
  titleTextStyle: {
    marginTop: hp(7),
    color: colors.titleColor,
    fontSize: wp(7),
    fontFamily: fonts.regular,
    marginHorizontal: wp(12),
  },
  inputContainer: {
    backgroundColor: colors.whiteColor,
    shadowColor: colors.viewShadowColor,
    height: hp(10),
    borderRadius: wp(5),
    paddingHorizontal: wp(2),
    justifyContent: 'center',
  },
  labelStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    height: hp(3.9),
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: colors.fieldtitleColor,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(90),
  },
  textFieldStyle: {
    fontSize: wp(4),
    flex: 1,
    marginLeft: wp(3),
  },
});
export default styles;

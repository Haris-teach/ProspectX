import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  logoStyle: {
    marginTop: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    paddingHorizontal: wp(5),
  },
  firstColumn: {
    marginTop: hp(10),
    marginHorizontal: wp(6),
    marginBottom: hp(4),
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
  inputRowView: {
    justifyContent: 'center',
    width: '100%',
    height: hp(5),
  },

  forgotStyle: {
    color: colors.likeBlackColor,
    fontSize: wp(3.3),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
  },
  signinStyle: {
    color: colors.titleColor,
    fontSize: wp(7.7),
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  enterEmailStyle: {
    color: 'rgba(129, 132, 162, 1)',
    fontSize: wp(4),
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginVertical: hp(1),
  },
  gradientView: {
    justifyContent: 'flex-end',
    height: hp(18),
    shadowColor: '#0E2247',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  forgotView: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height: hp(5),
  },
  inputViewStyle: {},
  textFieldStyle: {
    fontSize: wp(4),
    flex: 1,
    marginLeft: wp(3),
  },
});

export default styles;

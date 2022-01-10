//====================================== React Native Import Files ==================================
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
//====================================== Local Import Files =========================================

import colors from '../../assets/colors/Colors';
import images from '../../assets/images/Images';

import BackArrow from '../../assets/images/backarrow.svg';
import MailSvg from '../../assets/svg/email.svg';
import fonts from '../../assets/fonts/Fonts';
const MailInbox = props => {
  return (
    <ImageBackground style={{flex: 1}} source={images.splashBackground}>
      {/* Header Code */}

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}>
          <BackArrow height={15} width={15} />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>Change Password</Text> */}
      </View>
      {/* -------------------------------------------------------------------------- */}

      <View style={styles.mailInboxSenderView}>
        <Text style={styles.mailInboxSenderTextStyle}>
          {props.route.params.email}
        </Text>
      </View>

      <View style={styles.msgBox}>
        <View style={styles.iconStyle}>
          <View style={styles.subHeaderStyle}>
            <MailSvg marginHorizontal={wp(2)} />
            <Text style={styles.nameStyle}>{props.route.params.name}</Text>
          </View>
          <Text style={styles.dateStyle}>12/12/2021</Text>
        </View>

        <ScrollView
          style={{marginHorizontal: wp(4)}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.msgStyle}>{props.route.params.msg}</Text>
        </ScrollView>
      </View>

      <View style={styles.footerStyle}>
        <TouchableOpacity style={[styles.buttonStyle, {width: wp(48)}]}>
          <Text style={[styles.textStyle, {alignSelf: 'center'}]}>
            Forward this mail...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, {width: wp(28)}]}>
          <Text style={[styles.textStyle, {textAlign: 'center'}]}>
            Follow up
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default MailInbox;

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: colors.whiteColor,
    height: 27,
    width: 28,
    marginLeft: wp(6),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0E2247',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },

  mailInboxSenderView: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    height: hp(6),
    width: wp(80),
    alignSelf: 'center',
    borderRadius: wp(10),
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: wp(6),
    justifyContent: 'center',
  },
  mailInboxSenderTextStyle: {
    color: 'rgba(170, 177, 188, 1)',
    fontSize: wp(3.7),
    fontFamily: 'SF Pro Text',
    marginHorizontal: wp(5),
  },
  msgBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: hp(4),
    marginHorizontal: wp(10),
    borderRadius: wp(4),
    flex: 0.85,
  },
  iconStyle: {
    flexDirection: 'row',
    marginTop: hp(2),
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  nameStyle: {
    alignSelf: 'center',
    fontFamily: 'SF Pro Text',
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
  },
  dateStyle: {
    marginHorizontal: wp(5),
    alignSelf: 'center',
    color: 'black',
    fontSize: wp(3),
  },
  msgStyle: {
    color: '#959595',
    fontFamily: 'Sf Pro Text',
    fontSize: wp(3.5),
    lineHeight: hp(2.5),
    textAlign: 'left',
  },
  buttonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp(10),
  },
  textStyle: {
    fontSize: wp(3),
    marginVertical: hp(1.3),
    marginHorizontal: wp(2),
    color: '#7A7A7A',
  },
  footerStyle: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginHorizontal: wp(10),
    justifyContent: 'space-between',
  },
  subHeaderStyle: {flex: 1, flexDirection: 'row', alignSelf: 'center'},
});

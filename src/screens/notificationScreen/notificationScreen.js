//========================================= React Native Import Files ============================

import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//======================================== Local Import Files ====================================
import images from '../../assets/images/Images';
import Clock from '../../assets/svg/clock.svg';
import Calander from '../../assets/svg/calan.svg';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Haris',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '47 min ago',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Hassan',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '1  hours ago',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Arfat',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '3 Days ago',
  },
];

const NotificationScreen = props => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
          <View style={styles.viewContainer} />
          <Text style={styles.boldTextStyle} numberOfLines={1}>
            {item.name}
            <Text style={styles.msgStyle} numberOfLines={1}>
              {'  '}
              {item.msg}
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.miniContainer, {marginHorizontal: wp(6)}]}>
            <Clock
              alignSelf="center"
              marginHorizontal={wp(1)}
              width={wp(3)}
              height={hp(2)}
            />
            <Text style={styles.timeStyle}>11:00</Text>
          </View>
          <View style={styles.miniContainer}>
            <Clock
              alignSelf="center"
              marginHorizontal={wp(1)}
              width={wp(3)}
              height={hp(2)}
            />
            <Text style={styles.timeStyle}>10/12/2021</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={AllStyles.mainContainer}
        behavior={'padding'}>
        <ImageBackground
          source={images.splashBackground}
          style={AllStyles.mainContainer}>
          {/* Header Code */}

          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.backButton}>
              <BackArrow height={15} width={15} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
          {/* -------------------------------------------------------------------------- */}

          <View
            style={{
              flex: 1,
              marginTop: hp(4),
              marginHorizontal: wp(6),
            }}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = {
  headerContainer: {
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: colors.whiteColor,
    height: hp(3.5),
    width: wp(7.7),
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
  headerText: {
    flex: 1,
    color: colors.titleColor,
    fontSize: wp(5.5),
    fontFamily: 'SF Pro Text',
    textAlign: 'center',
    marginRight: wp(10),
  },
  viewContainer: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(2),
    backgroundColor: '#7681FF',
    alignSelf: 'center',
  },
  boldTextStyle: {
    marginLeft: wp(4),
    marginRight: wp(10),
    color: '#293859',
    fontWeight: 'bold',
  },
  msgStyle: {
    alignSelf: 'center',
    marginLeft: wp(2),
    fontFamily: 'SF Pro Text',
    fontSize: wp(3.3),
  },
  miniContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',

    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: wp(5),
    borderColor: 'white',
    borderWidth: 1,
  },
  timeStyle: {
    marginHorizontal: wp(1),
    alignSelf: 'center',
    color: 'rgba(118, 129, 255, 1)',
    fontSize: wp(3.4),
  },
};

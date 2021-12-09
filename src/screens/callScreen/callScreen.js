import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  StatusBar,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// ================local import=================

import RNSearch from '../../components/RNSearch/RNSearch';
import images from '../../assets/images/Images';

// =============================================

// ============SVG Imports===================

import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';
import INCall from '../../assets/svg/inCall.svg';
import OutCall from '../../assets/svg/outCall.svg';

// =========================================

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const CallScreen = props => {
  const Item = ({title, index, section}) => {
    // console.log('FADFAFASF:   ', section.data.length, index);
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.67)',
          marginHorizontal: wp(6),
          borderTopRightRadius: index == 0 ? wp(10) : wp(0),
          borderTopLeftRadius: index == 0 ? wp(10) : wp(0),
          borderBottomRightRadius:
            index == section.data.length - 1 ? wp(10) : wp(0),
          borderBottomLeftRadius:
            index == section.data.length - 1 ? wp(10) : wp(0),
          borderColor:
            index == 0 || index == section.data.length - 1
              ? 'white'
              : 'rgba(255, 255, 255, 0.67)',

          //   borderTopWidth: index == 0 ? 1 : -10,
          //   borderLeftWidth: 1,
          //   borderRightWidth: 1,
          //   borderBottomWidth: index === section.data.length - 1 ? 1 : 0,

          //marginBottom: index == section.data.length - 1 ? hp(5) : hp(0),
        }}>
        <View style={styles.listStyle}>
          <View style={styles.miniContainer}>
            <INCall width={wp(4)} height={hp(4)} alignSelf="center" />

            <Text style={styles.tileStyle}>{title}</Text>
          </View>

          <Text style={styles.durationStyle}>few min ago</Text>
        </View>

        {index < section.data.length - 1 ? (
          <View
            style={{borderWidth: 0.4, marginHorizontal: wp(10), opacity: 0.1}}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        style={styles.mainContainer}
        source={images.splashBackground}>
        <View style={styles.mainContainer}>
          {/* ===========Header PArt=========== */}

          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile')}>
              <Menu />
            </TouchableOpacity>
            <TouchableOpacity>
              <Bell />
            </TouchableOpacity>
          </View>

          {/* ==================================== */}

          {/* ================Search component============== */}

          <RNSearch
            placeholder="Select a number for calls"
            onPress={() => console.log('Presssed')}
          />

          {/* ==================================================== */}

          {/* ===============LIST VIEW========================== */}

          <SectionList
            style={{marginBottom: wp(17), flex: 1}}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, section, index}) => (
              <Item title={item} index={index} section={section} />
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />

          {/* ======================================================== */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CallScreen;

const styles = {
  mainContainer: {
    flex: 1,
    //backgroundColor: 'red',
  },
  headerContainer: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5),
    marginBottom: hp(1.5),
    marginHorizontal: wp(6),
  },

  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    marginHorizontal: wp(6),
    borderRadius: wp(10),
  },
  header: {
    fontFamily: 'SF Pro Text',
    fontSize: wp(4),
    color: '#B0B0B0',
    marginTop: hp(2),
    marginBottom: hp(2),
    marginHorizontal: wp(12),
  },

  tileStyle: {
    alignSelf: 'center',
    color: '#2E2E2E',
    fontFamily: 'SF Pro Text',
    marginHorizontal: wp(6),
    fontSize: wp(4),
  },
  listStyle: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    height: hp(6),
    justifyContent: 'space-between',
  },
  miniContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: wp(5),
  },
  durationStyle: {
    color: 'black',
    alignSelf: 'center',
    marginRight: wp(7),
    fontFamily: 'SF Pro Text',
    fontSize: hp(1.5),
  },
};

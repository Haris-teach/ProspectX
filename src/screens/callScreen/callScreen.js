import React, {useState} from 'react';
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
import {FloatingAction} from 'react-native-floating-action';
import DropDownPicker from 'react-native-dropdown-picker';

// ================local import=================
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import RNSearch from '../../components/RNSearch/RNSearch';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
// =============================================

// ============SVG Imports===================

import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';
import INCall from '../../assets/svg/inCall.svg';
import OutCall from '../../assets/svg/outCall.svg';
import Dilar from '../../assets/svg/dilar';
import Calendar from '../../assets/svg/calendar.svg';
import Contact from '../../assets/svg/contact.svg';
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
  const [items, setItems] = useState([
    {
      id: 0,
      label: '+1 111 565 259',
      value: '+1 111 565 259',
    },
    {
      id: 1,
      label: '+1 111 565 359',
      value: '+1 111 565 359',
    },
    {
      id: 2,
      label: '+1 111 565 459',
      value: '+1 111 565 459',
    },
    {
      id: 3,
      label: '+1 111 565 559',
      value: '+1 111 565 559',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Set Time');

  const Item = ({title, index, section}) => {
    // console.log('FADFAFASF:   ', section.data.length, index);
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('InComming', {name: title})}
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Notification')}>
              <Bell />
            </TouchableOpacity>
          </View>

          {/* ==================================== */}

          {/* ================DropDown component============== */}

          {/* <RNSearch
            placeholder="Select a number for calls"
            onPress={() => console.log('Presssed')}
          /> */}
          <RNDropDown
            open={open}
            placeholder="Select number for call"
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onPress={() => console.log('Pressed')}
            svg={<Contact />}
          />

          {/* ==================================================== */}

          {/* ===============LIST VIEW========================== */}

          <SectionList
            style={{
              flex: 1,
              marginBottom: hp(3.3),
              //backgroundColor: 'red',
            }}
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
          <View style={{marginBottom: hp(5.5)}}>
            <FloatingAction
              backgroundColor="red"
              floatingIcon={<Dilar />}
              //onPressMain={() => props.navigation.navigate('InComming')}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CallScreen;

const styles = {
  dropdownStyle: {
    width: wp(74),
    height: hp(6),
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(10),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderColor: 'white',
    height: hp(20),

    borderRadius: wp(5),
  },

  arrowIconStyle: {
    tintColor: colors.purpleColor,
    height: 25,
    width: 25,
  },
  containerStyle: {
    alignSelf: 'center',
    //backgroundColor: 'red',
    width: wp(74),
  },
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
  iconStyle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: hp(6),
    height: hp(6),
    marginLeft: wp(2),
    justifyContent: 'center',
    borderRadius: hp(6),
  },
};

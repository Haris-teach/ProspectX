import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import Calendar from '../../assets/svg/calendar.svg';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';

const RNDropDown = props => {
  return (
    <View
      style={{
        marginHorizontal: wp(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{
          decelerationRate: 'fast',
        }}
        style={styles.dropdownStyle}
        open={props.open}
        placeholder={props.placeholder}
        searchPlaceholderTextColor="black"
        placeholderStyle={{
          color: '#AAB1BC',
          fontFamily: fonts.regular,
          fontSize: wp(3.6),
          marginLeft: wp(4),
          //backgroundColor: 'red',
        }}
        textStyle={{marginLeft: wp(4)}}
        zIndex={999}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        showArrowIcon={true}
        showTickIcon={false}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        arrowIconStyle={styles.arrowIconStyle}
        containerStyle={styles.containerStyle}
        setValue={props.setValue}
        setItems={props.setItems}
        renderListItem={item => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.setOpen(false);
                props.setValue(item.value);
              }}
              style={{
                flexDirection: 'row',
                marginVertical: hp(1),
                marginHorizontal: wp(3),
                //backgroundColor: 'red',
              }}>
              {props.svg}
              <Text style={{marginHorizontal: wp(3), color: 'black'}}>
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity onPress={props.onPress} style={styles.iconStyle}>
        <Calendar alignSelf="center" />
      </TouchableOpacity>
    </View>
  );
};

export default RNDropDown;

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
    //color: 'red',
    borderRadius: wp(5),
    zIndex: 1000,
  },

  arrowIconStyle: {
    tintColor: colors.purpleColor,
    height: 25,
    width: 25,
  },
  containerStyle: {
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: wp(74),
  },
  mainContainer: {
    zIndex: 1,
    marginHorizontal: wp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
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

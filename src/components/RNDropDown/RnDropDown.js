import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import Calendar from '../../assets/svg/calendar.svg';
import Contact2 from '../../assets/svg/c2';
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
        marginBottom: props.marginBottom,
      }}>
      <DropDownPicker
        style={styles.dropdownStyle}
        open={props.open}
        props={{activeOpacity: 1}}
        placeholder={props.placeholder}
        searchPlaceholderTextColor="black"
        placeholderStyle={{
          color: '#AAB1BC',
          fontFamily: fonts.regular,
          fontSize: wp(3.6),
          //textAlign: 'center',
        }}
        textStyle={{color: 'black', marginHorizontal: wp(4), fontSize: wp(4)}}
        zIndex={999}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        showArrowIcon={true}
        showTickIcon={false}
        dropDownContainerStyle={[
          styles.dropDownContainerStyle,
          {height: props.items.length > 3 ? hp(15) : null},
        ]}
        arrowIconStyle={styles.arrowIconStyle}
        containerStyle={styles.containerStyle}
        setValue={props.setValue}
        setItems={props.setItems}
        renderListItem={(item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.onPress(item.item);
                props.setOpen(false);
                props.setValue(item.value);
              }}
              style={{
                flexDirection: 'row',
                marginVertical: hp(1),
                marginHorizontal: wp(3),
                //backgroundColor: 'red',
              }}>
              {item.item.id == 0
                ? props.svg
                : item.item.id % 2 == 0
                ? props.svg
                : props.svg2}
              <Text
                numberOfLines={1}
                style={{
                  marginHorizontal: wp(3),
                  color: 'black',
                  fontSize: wp(4),
                  //textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity onPress={props.onPress2} style={styles.iconStyle}>
        <Calendar alignSelf="center" />
      </TouchableOpacity>
    </View>
  );
};

export default RNDropDown;

const styles = {
  dropdownStyle: {
    width: wp(74),
    height: hp(7),
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(7),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    // marginTop: hp(0.5),
    borderColor: 'white',

    //color: 'red',
    // width: wp(90),
    borderRadius: wp(7),
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
    width: hp(6.9),
    height: hp(6.9),
    marginLeft: wp(2),
    justifyContent: 'center',
    borderRadius: hp(6.9),
  },
};

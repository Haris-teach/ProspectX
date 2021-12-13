//========================================= React Native Import Files ============================

import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import GradientButton from '../../components/gradientButton/Button';

import BackArrow from '../../assets/images/backarrow.svg';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';

const NewMailScreen = props => {
  const [value, setValue] = useState('Set Time');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      label: 'test1@gmail.com',
      value: 'test1@gmail.com',
    },
    {
      id: 1,
      label: 'test2@gmail.com',
      value: 'test2@gmail.com',
    },
    {
      id: 2,
      label: 'test3@gmail.com',
      value: 'test3@gmail.com',
    },
    {
      id: 3,
      label: 'test4@gmail.com',
      value: 'test4@gmail.com',
    },
    {
      id: 4,
      label: 'test4@gmail.com',
      value: 'test4@gmail.com',
    },
    {
      id: 5,
      label: 'test4@gmail.com',
      value: 'test4@gmail.com',
    },
  ]);

  return (
    <KeyboardAvoidingView style={AllStyles.mainContainer} behavior={'padding'}>
      <ImageBackground source={images.splashBackground} style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
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

          <DropDownPicker
            style={styles.dropdownStyle}
            open={open}
            zIndex={1}
            placeholder="Select email for mail"
            placeholderStyle={{
              color: colors.blackWithOpacityColor,
              fontFamily: fonts.regular,
              fontSize: wp(3.6),
              marginHorizontal: wp(3),
            }}
            value={value}
            items={items}
            setOpen={setOpen}
            showArrowIcon={true}
            showTickIcon={false}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            arrowIconStyle={styles.arrowIconStyle}
            listItemLabelStyle={{color: colors.blackolor}}
            containerStyle={styles.containerStyle}
            textStyle={{color: colors.blackolor, marginHorizontal: wp(3)}}
            labelStyle={{color: colors.blackolor}}
            setValue={setValue}
            setItems={setItems}
          />

          <View style={styles.toContainer}>
            <Text style={styles.toStyle}>To :</Text>
            <TextInput
              //placeholder="Type"
              numberOfLines={1}
              style={{width: wp(60)}}
            />
          </View>

          <View
            style={{
              marginHorizontal: wp(10),
              borderRadius: wp(4),
              backgroundColor: 'rgba(255, 255, 255, 0.72)',
              height: hp(55),
              //backgroundColor: 'red',
            }}>
            <Text
              style={{
                fontSize: wp(3.4),
                marginHorizontal: wp(5),
                marginVertical: hp(2),
                color: 'black',
                fontFamily: 'Sf Pro Text',
                opacity: 0.6,
              }}>
              Email Subject
            </Text>
            <TextInput
              // placeholder="tyoe"
              style={{
                marginHorizontal: wp(5),
                marginTop: hp(-1),

                height: hp(5),
              }}
            />
            <Text
              style={{
                fontSize: wp(3.4),
                marginHorizontal: wp(5),
                color: 'black',
                fontFamily: 'Sf Pro Text',
              }}>
              Email Content
            </Text>
            <TextInput
              // placeholder="tyoe"
              style={{
                marginHorizontal: wp(5),
                height: hp(25),
                textAlignVertical: 'top',
              }}
              numberOfLines={10}
            />
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: wp(83),
              marginBottom: hp(3),
              marginTop: hp(4),
            }}>
            <GradientButton
              onPress={() => alert('Flow is pending')}
              title={'Save'}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default NewMailScreen;

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
  dropdownStyle: {
    height: hp(6),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(10),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
    //justifyContent: 'center',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderColor: 'white',
    height: hp(20),
    borderRadius: wp(5),
    zIndex: 1,
  },

  arrowIconStyle: {
    tintColor: colors.purpleColor,
    height: 25,
    width: 25,
  },
  containerStyle: {
    alignSelf: 'center',
    //backgroundColor: 'yellow',
    width: wp(80),
    zIndex: 1,
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
  toStyle: {
    alignSelf: 'center',
    marginHorizontal: wp(6),
    fontFamily: 'SF Pro Text',
    color: 'black',
  },
  toContainer: {
    zIndex: 0,
    marginHorizontal: wp(10),
    marginVertical: hp(2),
    flexDirection: 'row',
    height: hp(6),
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(10),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
};

{
  /* <View style={{flex: 1}}> */
}

//   <DropDownPicker
//     style={styles.dropdownStyle}
//     open={open}
//     zIndex={1}
//     placeholder="Select email for mail"
//     placeholderStyle={{
//       color: colors.blackWithOpacityColor,
//       fontFamily: fonts.regular,
//       fontSize: wp(3.6),
//       marginHorizontal: wp(3),
//     }}
//     value={value}
//     items={items}
//     setOpen={setOpen}
//     showArrowIcon={true}
//     showTickIcon={false}
//     dropDownContainerStyle={styles.dropDownContainerStyle}
//     arrowIconStyle={styles.arrowIconStyle}
//     listItemLabelStyle={{color: colors.blackolor}}
//     containerStyle={styles.containerStyle}
//     textStyle={{color: colors.blackolor, marginHorizontal: wp(3)}}
//     labelStyle={{color: colors.blackolor}}
//     setValue={setValue}
//     setItems={setItems}
//   />

//   <View
//     style={{
//       zIndex: 1,
//       marginHorizontal: wp(10),
//       marginVertical: hp(2),
//       flexDirection: 'row',
//       height: hp(6),
//       backgroundColor: 'rgba(255, 255, 255, 0.67)',
//       borderRadius: wp(10),
//       color: 'black',
//       borderWidth: 0.5,
//       borderColor: 'rgba(255, 255, 255, 1)',
//       shadowColor: 'white',
//       shadowOffset: {
//         width: 0,
//         height: 6,
//       },
//       shadowOpacity: 0.4,
//       shadowRadius: 5,
//       elevation: 10,
//     }}>
//     <Text style={styles.toStyle}>To :</Text>
//     <TextInput
//       //placeholder="Type"
//       numberOfLines={1}
//       style={{width: wp(60)}}
//     />
//   </View>

//   <View
//     style={{
//       marginHorizontal: wp(10),
//       borderRadius: wp(4),
//       backgroundColor: 'rgba(255, 255, 255, 0.72)',
//       flex: 0.9,
//     }}>
//     <Text
//       style={{
//         fontSize: wp(3.4),
//         marginHorizontal: wp(5),
//         marginVertical: hp(2),
//         color: 'black',
//         fontFamily: 'Sf Pro Text',
//         opacity: 0.6,
//       }}>
//       Email Subject
//     </Text>
//     <TextInput
//       // placeholder="tyoe"
//       style={{
//         marginHorizontal: wp(5),
//         marginTop: hp(-1),
//       }}
//     />
//     <Text
//       style={{
//         fontSize: wp(3.4),
//         marginHorizontal: wp(5),

//         color: 'black',
//         fontFamily: 'Sf Pro Text',
//       }}>
//       Email Content
//     </Text>
//     <TextInput
//       // placeholder="tyoe"
//       style={{
//         marginHorizontal: wp(5),
//         marginTop: hp(-1),
//         textAlignVertical: 'top',
//         //backgroundColor: 'red',
//       }}
//       numberOfLines={10}
//     />
//   </View>

//   <View
//     style={{
//       flex: 0.14,
//       alignSelf: 'center',
//       width: wp(83),
//       justifyContent: 'flex-end',
//       marginBottom: hp(5),
//     }}>
//     <GradientButton
//       onPress={() => alert('Login Pressed')}
//       title={'Save'}
//     />
//   </View>
// </View>

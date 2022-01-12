//========================================= React Native Import Files ============================

import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  FlatList,
  Image,
} from 'react-native';
var axios = require('axios');
var FormData = require('form-data');
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
var data = new FormData();
import {FloatingAction} from 'react-native-floating-action';
import LinearGradient from 'react-native-linear-gradient';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import * as yup from 'yup';
import {Formik} from 'formik';

import GradientButton from '../../components/gradientButton/Button';
import BackArrow from '../../assets/images/backarrow.svg';
import Pen from '../../assets/svg/pen.svg';
import PaperClip from '../../assets/svg/paperClip.svg';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import {SENDEMAIL} from '../../HitApis/Urls';

const NewMailScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const emails = useSelector(state => state.commonReducer.emails);

  const [value, setValue] = useState('Set Time');
  const [toMail, setToMail] = useState(null);
  const [subj, setSubj] = useState('');
  const [content, setcontent] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      label: 'farhan.zia@argonteq.com',
      value: 'farhan.zia@argonteq.com',
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
  ]);
  const [fileUri, setFileURI] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const Documentpicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        presentationStyle: 'fullScreen',
      });

      setFiles(res);
      // console.log('Response:  ', files);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and mo
      } else {
        throw err;
      }
    }
  };

  const SendEmail = ({email}) => {
    setIsLoading(true);
    data.append('from', value.toString());
    data.append('to', email);
    data.append('text', content);
    data.append('subject', subj);
    files.forEach(element => {
      data.append('file[]', {
        uri: element.uri,
        name: element.name,
        type: element.type,
      });
    });

    console.log('DATA:   ', data);
    var config = {
      method: 'post',
      url: SENDEMAIL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setIsLoading(false);
        console.log('Response:    ', JSON.stringify(response.data));
        props.navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        Toast.showWithGravity(
          JSON.stringify(error.message),
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });

    // setcontent('');
    // setSubj('');
    // setToMail('');
    data = new FormData();
    setFiles([]);
  };

  useEffect(() => {
    setcontent(props.route.params.msg);
    setItems(emails);
    setIsLoading(false);
  }, []);

  const DeleteFile = i => {
    setFiles(files.filter((item, index) => index != i));
    console.log(files);
  };

  const userInfo = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label('email')
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  return (
    <KeyboardAvoidingView
      style={AllStyles.mainContainer}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <ImageBackground source={images.splashBackground} style={{flex: 1}}>
        {isLoading == true ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(0.5,0,0,0.5)',
              position: 'absolute',
            }}>
            <ActivityIndicator animating={true} color="blue" />
          </View>
        ) : (
          <ScrollView>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={(values, {resetForm}) => {
                //props.navigation.navigate('LoginScreen');
                SendEmail(values);
                // setIsMessage('');
                resetForm();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => {
                const {email, password} = values;
                return (
                  <>
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
                    <>
                      <DropDownPicker
                        props={{activeOpacity: 1}}
                        style={styles.dropdownStyle}
                        open={open}
                        placeholder="Select email for mail"
                        searchPlaceholderTextColor="#AAB1BC"
                        placeholderStyle={{
                          color: '#AAB1BC',
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
                        listItemLabelStyle={{color: 'black'}}
                        containerStyle={styles.containerStyle}
                        textStyle={{color: 'black', marginHorizontal: wp(3)}}
                        labelStyle={{color: 'black'}}
                        setValue={setValue}
                        setItems={setItems}
                      />
                    </>

                    <View style={styles.toContainer}>
                      <Text style={styles.toStyle}>To :</Text>
                      <TextInput
                        //placeholder="Type"
                        numberOfLines={1}
                        style={{width: wp(60)}}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={email}
                        autoCapitalize="none"
                        keyboardType={'email-address'}
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={styles.warningStyle}>{errors.email}</Text>
                    )}

                    <View style={styles.subjectStyle}>
                      <Text style={styles.subjectTextStyle}>Email Subject</Text>
                      <TextInput
                        placeholder="Write your subject"
                        placeholderTextColor="gray"
                        onChangeText={text => setSubj(text)}
                        value={subj}
                        style={styles.subjectInputStyle}
                      />
                      <Text style={styles.contentTextStyle}>Email Content</Text>
                      <TextInput
                        placeholder="Write your content"
                        placeholderTextColor="gray"
                        onChangeText={text => setcontent(text)}
                        value={content}
                        style={styles.contentInputStyle}
                        multiline={true}
                        //numberOfLines={10}
                      />
                      {files.length != 0 ? (
                        <View style={{height: hp(16.5)}}>
                          <FlatList
                            data={files}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => {
                              return (
                                <View style={styles.attachmentStyle}>
                                  <TouchableOpacity
                                    onPress={() => DeleteFile(index)}
                                    style={styles.crossBtnStyle}>
                                    <Image
                                      source={require('../../assets/png/CrossImage.png')}
                                      style={styles.crossImageStyle}
                                      resizeMode="contain"
                                    />
                                  </TouchableOpacity>
                                  <Text style={styles.labelStyle}>
                                    {item.name}
                                  </Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                      ) : null}
                    </View>
                    {/* <View style={{marginRight: wp(4), marginTop: hp(2)}}>
              <FloatingAction
                backgroundColor="red"
                floatingIcon={<PaperClip />}
                onPressMain={() => Documentpicker()}
              />
            </View> */}
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => Documentpicker()}
                      style={styles.floatingActionStyle}>
                      <LinearGradient
                        colors={['#6FB3FF', '#7F5AFF']}
                        start={{y: 0.0, x: 0.0}}
                        style={styles.floatingBtnStyle}
                        end={{y: 0.0, x: 1.0}}>
                        <PaperClip />
                      </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.sendBtnStyle}>
                      <GradientButton onPress={handleSubmit} title={'Send'} />
                    </View>
                  </>
                );
              }}
            </Formik>
          </ScrollView>
        )}
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

    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(5),
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
    height: hp(15),
    borderRadius: wp(5),
  },

  arrowIconStyle: {
    tintColor: colors.purpleColor,
    height: 25,
    width: 25,
  },
  containerStyle: {
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    width: wp(80),
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
  subjectStyle: {
    marginHorizontal: wp(10),
    borderRadius: wp(4),
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    height: hp(55),
    //backgroundColor: 'red',
  },
  subjectTextStyle: {
    fontSize: wp(3.4),
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    color: 'black',
    fontFamily: 'Sf Pro Text',
    opacity: 1,
  },
  subjectInputStyle: {
    marginHorizontal: wp(5),
    // backgroundColor: 'red',
    marginTop: hp(-2.5),

    height: hp(5),
    color: 'black',
  },
  contentTextStyle: {
    fontSize: wp(3.4),
    marginHorizontal: wp(5),
    color: 'black',
    fontFamily: 'Sf Pro Text',
  },
  contentInputStyle: {
    marginHorizontal: wp(5),
    height: hp(20),
    textAlignVertical: 'top',
    //backgroundColor: 'red',
    color: 'black',
  },
  uriBoxStyle: {
    //backgroundColor: 'yellow',
    width: wp(70),
    height: 50,
    marginHorizontal: wp(5),
    marginTop: hp(3),
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  crossBtnStyle: {
    width: wp(12),
    marginVertical: hp(0.5),
    // backgroundColor: 'red',
    alignSelf: 'flex-end',
    marginTop: hp(-2.5),
    marginRight: wp(-5),
  },
  crossImageStyle: {
    width: wp(5),
    height: hp(5),
    marginHorizontal: wp(3),
  },
  sendBtnStyle: {
    alignSelf: 'center',
    width: wp(83),
    marginBottom: hp(3),
    marginTop: hp(-5),
  },
  attachmentStyle: {
    justifyContent: 'center',
    width: wp(70),
    marginHorizontal: wp(6),
    borderWidth: 1,
    marginVertical: hp(1),
    borderColor: 'blue',
  },
  floatingActionStyle: {
    height: hp(8),
    width: wp(20),
    alignSelf: 'flex-end',
    bottom: hp(8),
    marginRight: wp(8),
  },
  floatingBtnStyle: {
    borderRadius: hp(7),
    height: hp(7),
    width: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelStyle: {
    alignSelf: 'center',
    color: 'black',
    marginBottom: hp(1.5),
  },
  warningStyle: {
    marginHorizontal: wp(28),
    marginTop: hp(-2),
    marginBottom: hp(1),
    fontSize: wp('3%'),
    color: 'red',
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

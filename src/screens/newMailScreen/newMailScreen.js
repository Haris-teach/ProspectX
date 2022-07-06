//========================================= React Native Import Files ============================

import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import BackArrow from '../../assets/images/backarrow.svg';
import images from '../../assets/images/Images';
import BluePaperPin from '../../assets/svg/bluePin.svg';
import PaperClip from '../../assets/svg/paperClip.svg';
import RedCross from '../../assets/svg/redCross';
import GradientButton from '../../components/gradientButton/Button';
import {SENDEMAIL} from '../../HitApis/Urls';
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

const NewMailScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const emails = useSelector(state => state.commonReducer.emails);
  const [value, setValue] = useState('Set Time');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const Documentpicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (files.length < 1) {
        setFiles([...files, ...res]);
      } else {
        let count = 0;
        files.map(i => {
          if (i.name === res[0].name) {
            count = 1;
          }
        });
        if (count == 0) {
          setFiles([...files, ...res]);
        } else {
          Toast.showWithGravity(
            'File alreday exits',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and mo
      } else {
        throw err;
      }
    }
  };

  const SendEmail = ({email, subject, content}) => {
    setIsLoading(true);
    data.append('from', value.toString());
    data.append('to', email);
    data.append('text', content);
    data.append('subject', subject);
    files.forEach(element => {
      data.append('file[]', {
        uri: element.uri,
        name: element.name,
        type: element.type,
      });
    });

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
        props.navigation.goBack();
      })
      .catch(function (error) {
        let err = error.response.data.errors[0].split('.');
        setIsLoading(false);
        let msgs = '';
        if (err[0] == 'Expected params') {
          Toast.showWithGravity('Select from email', Toast.SHORT, Toast.BOTTOM);
        } else {
          Toast.showWithGravity(err[0], Toast.SHORT, Toast.BOTTOM);
        }
      });

    data = new FormData();
    setFiles([]);
  };

  useEffect(() => {
    setIsLoading(false);
    emails.forEach(i => {
      if (i.value == 'All Mails') {
        setItems([]);
      } else {
        items.push({
          id: i.id,
          label: i.label,
          value: i.value,
        });
      }
      setItems(items);
    });
  }, []);

  const DeleteFile = i => {
    setFiles(files.filter((item, index) => index != i));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const userInfo = {
    email: '',
    subject: props.route.params.subject,
    content: props.route.params.msg,
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label('email')
      .email('Email must be a valid email address')
      .required('Email is required'),
    subject: yup
      .string()
      .label('email')
      .required('Email subject and content are required'),
    content: yup
      .string()
      .label('email')
      .required('Email subject and content are required'),
  });

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={images.splashBackground} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              SendEmail(values);
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
              const {email, subject, content} = values;
              return (
                <>
                  {/* Header Code */}
                  <View style={styles.headerContainer}>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={styles.backButton}>
                      <BackArrow height={15} width={15} />
                    </TouchableOpacity>
                  </View>
                  {/* -------------------------------------------------------------------------- */}

                  <DropDownPicker
                    props={{activeOpacity: 1}}
                    style={styles.dropdownStyle}
                    open={open}
                    placeholder="From"
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
                    dropDownContainerStyle={[
                      styles.dropDownContainerStyle,
                      {height: items.length > 3 ? hp(15) : null},
                    ]}
                    arrowIconStyle={styles.arrowIconStyle}
                    listItemLabelStyle={{color: 'black'}}
                    containerStyle={styles.containerStyle}
                    textStyle={{color: 'black', marginHorizontal: wp(3)}}
                    labelStyle={{color: 'black'}}
                    setValue={setValue}
                    setItems={setItems}
                  />

                  <View style={styles.toContainer}>
                    <Text style={styles.toStyle}>To :</Text>
                    <TextInput
                      placeholder="Type to email"
                      numberOfLines={1}
                      style={{width: wp(60), color: 'black'}}
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

                  <View
                    style={[
                      styles.subjectStyle,
                      {
                        height:
                          subject == '' &&
                          content.length == '' &&
                          files.length < 1
                            ? hp(53.5)
                            : null,
                      },
                    ]}>
                    <Text style={styles.subjectTextStyle}>Email Subject</Text>
                    <TextInput
                      placeholder="Write your subject"
                      placeholderTextColor="gray"
                      onChangeText={handleChange('subject')}
                      onBlur={handleBlur('subject')}
                      value={subject}
                      style={styles.subjectInputStyle}
                    />

                    <Text style={styles.contentTextStyle}>Email Content</Text>
                    <TextInput
                      placeholder="Write your content"
                      placeholderTextColor="gray"
                      onChangeText={handleChange('content')}
                      onBlur={handleBlur('content')}
                      value={content}
                      style={[
                        styles.contentInputStyle,
                        {height: content.length < 350 ? hp(25) : null},
                      ]}
                      multiline={true}
                    />

                    {files.length != 0 ? (
                      <View>
                        <FlatList
                          data={files}
                          extraData={files}
                          nestedScrollEnabled={true}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item, index}) => {
                            return (
                              <View style={styles.attachmentStyle}>
                                <BluePaperPin />
                                <Text
                                  style={styles.labelStyle}
                                  numberOfLines={1}>
                                  {item.name}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => DeleteFile(index)}>
                                  <RedCross />
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                        />
                      </View>
                    ) : null}
                    <TouchableOpacity
                      disabled={isLoading ? true : false}
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
                  </View>

                  {touched.content && errors.content && (
                    <Text style={styles.warning1Style}>{errors.content}</Text>
                  )}
                  {touched.subject && errors.subject && (
                    <Text style={styles.warning2Style}>{errors.subject}</Text>
                  )}

                  <View style={styles.sendBtnStyle}>
                    <GradientButton
                      onPress={handleSubmit}
                      title={'Send'}
                      condition={isLoading}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
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
    fontFamily: fonts.regular,
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
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderColor: 'white',

    borderRadius: wp(5),
  },

  arrowIconStyle: {
    tintColor: colors.purpleColor,
    height: 25,
    width: 25,
  },
  containerStyle: {
    alignSelf: 'center',

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
    marginLeft: wp(6),
    marginRight: wp(2),
    fontFamily: fonts.regular,
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
  },
  subjectTextStyle: {
    fontSize: wp(3.4),
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    color: 'black',
    fontFamily: fonts.regular,
    opacity: 1,
  },
  subjectInputStyle: {
    marginHorizontal: wp(5),

    marginTop: hp(-2.5),

    height: hp(5),
    color: 'black',
  },
  contentTextStyle: {
    fontSize: wp(3.4),
    marginHorizontal: wp(5),
    color: 'black',
    fontFamily: fonts.regular,
  },
  contentInputStyle: {
    marginHorizontal: wp(5),

    textAlignVertical: 'top',

    color: 'black',
  },
  uriBoxStyle: {
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
    marginTop: hp(2),
  },
  attachmentStyle: {
    justifyContent: 'space-around',
    width: wp(70),
    marginHorizontal: wp(6),
    flexDirection: 'row',
    marginVertical: hp(1),
    backgroundColor: '#EAEAFF',
    borderRadius: wp(10),
    alignSelf: 'center',
    alignItems: 'center',
  },
  floatingActionStyle: {
    flex: 1,
    height: hp(8),
    width: wp(20),
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',

    marginBottom: hp(1),
    marginRight: wp(-1),
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
    marginVertical: hp(2),
    width: wp(40),
  },
  warningStyle: {
    marginHorizontal: wp(13),
    marginTop: hp(-1.5),
    marginBottom: hp(1),
    fontSize: wp('3%'),
    color: 'red',
  },
  warning1Style: {
    marginHorizontal: wp(13),
    fontSize: wp('3%'),
    color: 'red',
  },
  warning2Style: {
    marginHorizontal: wp(13),
    fontSize: wp('3%'),
    color: 'red',
  },
};

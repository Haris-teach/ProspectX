import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  Platform,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';

import moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import CalendarPicker from 'react-native-calendar-picker';
import {Dialog} from 'react-native-simple-dialogs';
import AllStyles from '../../all_styles/All_Styles';
// import TwilioVoice from 'react-native-twilio-voice-sdk';
// import TwilioVoice from 'react-native-twilio-programmable-voice'
import Toast from 'react-native-simple-toast';
import RNCallKeep from 'react-native-callkeep';
import {
  EventType,
  RNTwilioPhone,
  twilioPhoneEmitter,
} from 'react-native-twilio-phone';
// ================local import=================
import RNDropDown from '../../components/RNDropDown/RnDropDown';

import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import HitApi from '../../HitApis/APIHandler';
import {
  GETPHONENUM,
  CALLLOGS,
  CALL_TOKEN_API,
  LOGOUT,
  CLOSE_ORDER,
  CALL_DEDUCTION,
} from '../../HitApis/Urls';
import {
  PROFILE_CHANGE_PASS,
  PROFILE_LOGOUT,
} from '../../constants/ConstStrings';

import Settings from '../../assets/images/settings.svg';
import ChangePassword from '../../assets/images/unlock.svg';
import Logout from '../../assets/images/logout.svg';
import {logout} from '../../redux/Actions/authActions';
import BackArrow from '../../assets/images/backarrow.svg';
import ProfileComponent from '../../components/ProfileComponent/ProfileRow';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GetNumbers} from '../../redux/Actions/commonAction';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import RNRestart from 'react-native-restart';
// =============================================

// ============SVG Imports===================
import Cross from '../../assets/svg/cross.svg';
import PhoneBtn from '../../assets/svg/phoneBtn.svg';
import One from '../../assets/svg/one.svg';
import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';
import INCall from '../../assets/svg/inCall.svg';
import OutCall from '../../assets/svg/outCall.svg';
import Dilar from '../../assets/svg/dilar.svg';
import Call from '../../assets/svg/call.svg';
import Contact from '../../assets/svg/contact.svg';
import Contact2 from '../../assets/svg/c1.svg';
import uuid from 'react-native-uuid';
import analytics from '@react-native-firebase/analytics';
// =========================================

var myInterval2;
// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#usage)
const callKeepOptions = {
  ios: {
    appName: 'ProspecX',
    supportsVideo: false,
    maximumCallGroups: '1',
    maximumCallsPerCallGroup: '1',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.prospectx.app',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};

// RNTwilioPhone options
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

const CallScreen = props => {
  const [callInProgress, setCallInProgress] = useState(false);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const sizeSheet = useRef();

  const token = useSelector(state => state.authReducer.token);

  const [items, setItems] = useState([
    {
      id: 0,
      label: 'All Numbers',
      value: 'All Numbers',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [callLogs, setCallLogs] = useState([]);
  const [isCallLogs, setIsCallLogs] = useState([]);
  const [isCallBtn, setIsCallBtn] = useState(false);
  const [isString, setIsString] = useState('');
  const [isPopUp, setIsPopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ================== Render Section list function ==============
  const Item = ({title, index, section}) => {
    return (
      <>
        {title.to.split(':').length == 1 &&
        title.from.split(':').length == 1 ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setOpen(false);
              setIsString(
                title.direction == 'outbound-dial' ? title.to : title.from,
              );
              sizeSheet.current.open();
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.67)',
              marginHorizontal: wp(6),
              borderTopRightRadius: index == 0 ? wp(7) : wp(0),
              borderTopLeftRadius: index == 0 ? wp(7) : wp(0),
              borderBottomRightRadius:
                index == section.data.length - 1 ? wp(7) : wp(0),
              borderBottomLeftRadius:
                index == section.data.length - 1 ? wp(7) : wp(0),
              borderColor:
                index == 0 || index == section.data.length - 1
                  ? 'white'
                  : 'rgba(255, 255, 255, 0.67)',
            }}>
            <View style={styles.listStyle}>
              <View style={styles.miniContainer}>
                {title.direction != 'outbound-dial' ? (
                  <INCall width={wp(4)} height={hp(4)} alignSelf="center" />
                ) : (
                  <OutCall width={wp(4)} height={hp(4)} alignSelf="center" />
                )}

                <Text style={styles.tileStyle}>
                  {title.direction == 'outbound-dial' ? title.to : title.from}
                </Text>
              </View>

              <Text style={styles.durationStyle}>
                {' '}
                {moment(title.endDate).format('h:mm A')}
              </Text>
            </View>

            {index < section.data.length - 1 ? (
              <View
                style={{
                  borderWidth: 0.4,
                  marginHorizontal: wp(10),
                  opacity: 0.1,
                }}
              />
            ) : null}
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  // ============= END ===========================

  // ============== GET all phone  numbers function ================
  const GetAllNumbers = () => {
    setOpen(false);
    setValue(null);
    HitApi(GETPHONENUM, 'get', '', token).then(res => {
      // let allNumbers = [];
      res.data.forEach(i => {
        items.push({
          id: i.id + 1,
          label: i.label.incoming_number,
          value: i.value.incoming_number,
        });
        setItems(items);
      });

      dispatch(GetNumbers(items));
    });
  };
  useEffect(() => {
    GetAllNumbers();
    setIsLoading(true);
    setTimeout(() => {
      GetCallLogs('All Numbers');
    }, 3000);

    const RNCALL = [
      RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
        console.log('Answer the call:  ,', callUUID);
      }),

      RNCallKeep.addEventListener('endCall', callUUID => {
        console.log('End the call:  ,', callUUID);
        Close_Order();
      }),
    ];

    const unsubscribe = messaging().onMessage(remoteMessage => {
      //dispatch(GetNotiNumber(1));

      handleNotification(remoteMessage);
    });

    return () => {
      unsubscribe();
      RNCALL.map(subscription => {
        subscription.remove();
      });
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setValue(null);
  }, [isFocused]);
  // ============================== END  =================================

  // ============== Get all call logs =============================
  const GetCallLogs = pageVal => {
    setIsLoading(true);
    let params = {
      filters: {
        numbers: pageVal === 'All Numbers' ? [] : [pageVal],
      },
      pagination: {
        page_number: 1,
        page_size: 100,
      },
    };

    HitApi(CALLLOGS, 'post', params, token).then(res => {
      setIsLoading(false);
      if (res.status == 1) {
        setCallLogs(res.data.call_logs);
        setIsCallLogs(res.data.call_logs);
      } else {
        if (res.code == 401) {
          dispatch(logout());
        }
      }
    });
  };

  // =================== END =====================================

  // ================ Concatinate string function ================

  const concatinate = v => {
    let word = isString;

    if (v == 'del') {
      // Vibration.vibrate(50);
      word = word.slice(0, -1);
      setIsString(word);
      return;
    } else {
      if (word.length < 13) {
        //Vibration.vibrate(50);
        word = word + v;
        setIsString(word);
      }
    }
  };
  // ========================= END =========================

  const fetchAccessToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    const accessToken = await HitApi(
      `${CALL_TOKEN_API}&uuid=${fcmToken}`,
      'get',
      '',
      token,
    );
    return accessToken.data.token;
  };
  //==================== Call functions ==========================
  const twilioToken = useSelector(state => state.commonReducer.twilioToken);
  const externalId = useSelector(state => state.authReducer.externalId);

  const Call_deduction = callSid => {
    HitApi(`${CALL_DEDUCTION}/?call_sid=${callSid}`, 'Get', '', token)
      .then(res => {
        console.log('call deduction', res);
        if (res.message != 'OK') {
          hangup();
          Close_Order();
          BackgroundTimer.clearInterval(myInterval2);
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull');
        BackgroundTimer.clearInterval(myInterval2);
        hangup();
      });
  };

  const Close_Order = () => {
    HitApi(`${CLOSE_ORDER}/?user_id=${externalId}`, 'Get', '', token)
      .then(res => {
        console.log(res);
        if (res.message == 'OK') {
          hangup();
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull');
        BackgroundTimer.clearInterval(myInterval2);
        hangup();
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);
      RNTwilioPhone.initializeCallKeep(
        callKeepOptions,
        fetchAccessToken,
        options,
      );

      const subscriptions = [
        twilioPhoneEmitter.addListener(EventType.CallConnected, async sid => {
          console.log('Isconnected', sid.callSid);
          Call_deduction(sid.callSid);
          myInterval2 = BackgroundTimer.setInterval(() => {
            Call_deduction(sid.callSid);
            console.log('listner is running');
          }, 20000);
        }),
        twilioPhoneEmitter.addListener(EventType.CallDisconnected, sid => {
          console.log('DisCounnected', sid.callSid);
          Close_Order();
          hangup();
        }),
        twilioPhoneEmitter.addListener(
          EventType.CallDisconnectedError,
          data => {
            hangup();
          },
        ),
        twilioPhoneEmitter.addListener(EventType.CallConnectFailure, () => {
          console.log('CallConnectFailure');
          hangup();
        }),
      ];

      return () => {
        subscriptions.map(subscription => {
          subscription.remove();
        });
      };
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  function hangup() {
    RNCallKeep.endAllCalls();
    BackgroundTimer.clearInterval(myInterval2);
  }

  const getNewUuid = () => uuid.v4().toLowerCase();
  async function call(fromNum) {
    if (isString === '') {
      return;
    }

    // setCallInProgress(true);

    try {
      if (Platform.OS === 'android') {
        RNTwilioPhone.startCall(isString, isString, fromNum);
      } else {
        const callUUID = getNewUuid();

        // RNTwilioPhone.startCall(isString, isString, from);
        setIsPopUp(false);
        setTimeout(() => {
          props.navigation.replace('CallStart', {
            name: isString,
            callUUID: callUUID,
            accessToken: twilioToken,
            fromNum: fromNum,
          });
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleNotification = remoteMessage => {
    if (remoteMessage.data) {
      return null;
    } else {
      popup.current.show({
        appIconSource: null,
        appTitle: 'ProspectX',
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        slideOutTime: 2000,
      });
    }
  };

  // };
  //==================== END =====================================

  // ========================= On Notification OPEN ====================
  messaging().onNotificationOpenedApp(remoteMessage => {
    props.navigation.navigate('Home', {screen: 'Message'});
  });
  // ===================== END ===========================

  // ================== Date picker Modal =================
  const RenderModal = () => {
    return (
      <Dialog
        visible={isvisible}
        dialogStyle={{
          width: wp(98),
          height: Platform.OS === 'ios' ? hp(50) : hp(53),
          marginHorizontal: wp(-5),
        }}
        onTouchOutside={() => setIsVisible(false)}>
        <View
          style={{
            backgroundColor: '#7F5AFF',
            marginTop: Platform.OS === 'ios' ? hp(-2.13) : hp(-2.7),
            padding: hp(1.5),
            borderBottomRightRadius: hp(10),
            borderBottomLeftRadius: hp(10),
            borderColor: 'transparent',
            borderWidth: 1,
            width: wp(97.9),
            marginLeft: Platform.OS === 'ios' ? wp(-5.6) : wp(-6),
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            Select Range Date
          </Text>
        </View>
        <View style={{height: hp(38.65)}}>
          <CalendarPicker
            width={wp(99)}
            // resetSelections
            // height={hp(60)}
            onDateChange={(date, param) => {
              if (param == 'START_DATE') {
                setStartDate(moment(date).format('YYYY-MM-DD'));
              } else if (param == 'END_DATE') {
                setEndDate(moment(date).format('YYYY-MM-DD'));
              }
            }}
            maxDate={new Date()}
            allowRangeSelection={true}
            selectedRangeStartTextStyle={{color: 'white'}}
            selectedRangeEndTextStyle={{color: 'white'}}
            selectedRangeStyle={{backgroundColor: '#7F5AFF'}}
            allowBackwardRangeSelect={true}
            previousTitleStyle={{color: '#7F5AFF'}}
            nextTitleStyle={{
              color: '#7F5AFF',
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (endDate === '' || endDate == 'Invalid date') {
              Toast.show('Please select end date');
            } else {
              setIsLoading(true);
              setIsVisible(false);
              DateFilter();
            }
          }}
          style={styles.calanderBtnStyle}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Done</Text>
        </TouchableOpacity>
      </Dialog>
    );
  };
  // ======================= END =======================

  // =================== Date filter Function ===============
  const DateFilter = () => {
    setIsLoading(false);
    setEndDate('');
    setStartDate('');
    setIsCallLogs(
      callLogs.filter(function (a) {
        return (
          moment(a.title).format('YYYY-MM-DD') >= startDate &&
          moment(a.title).format('YYYY-MM-DD') <= endDate
        );
      }),
    );
  };
  // =================== END =========================

  // ===================== Select sim number Modal ================
  const SelectSim = () => {
    return (
      <Dialog
        visible={isPopUp}
        dialogStyle={styles.selectSim}
        onTouchOutside={() => setIsPopUp(false)}>
        <View>
          <Text style={styles.selectSimTextStyle}>Select From Number</Text>
          <View style={{maxHeight: hp(25), marginTop: hp(2)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={items}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => {
                return (
                  <>
                    {index == 0 ? null : (
                      <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        onPress={() => {
                          setIsPopUp(false);
                          call(item.value);
                        }}>
                        <Call alignSelf="center" width={wp(5)} height={hp(5)} />
                        <Text style={styles.renderNumberStyle}>
                          {item.value}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                );
              }}
              nestedScrollEnabled={true}
            />
          </View>
        </View>
      </Dialog>
    );
  };
  // ===================== END =======================

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={images.splashBackground}>
      <View style={styles.mainContainer}>
        {RenderModal()}
        {SelectSim()}

        {/* =========== Header Part=========== */}

        <AppHeader
          leftonPress={() => props.navigation.navigate('Profile')}
          rightonPress={() => {
            setOpen(false);
            props.navigation.navigate('Notification');
          }}
          leftIcon={<Menu />}
          rightIcon={<Bell />}
        />

        {/* ==================================== */}

        {/* ================DropDown component============== */}

        <RNDropDown
          open={open}
          placeholder="Select From Number"
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={value => {
            setIsLoading(true);
            GetCallLogs(value.value);
          }}
          onPress2={() => {
            setOpen(false);
            setIsVisible(true);
          }}
          svg={<Contact />}
          svg2={<Contact2 />}
        />

        {/* ========================== END ========================== */}

        {/* ===============LIST VIEW========================== */}

        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color="blue" />
          </View>
        ) : (
          <>
            {isCallLogs.length == 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text style={{alignSelf: 'center', color: 'black'}}>
                  Record not found
                </Text>
              </View>
            ) : (
              <SectionList
                refreshing={isLoading}
                onRefresh={() => GetCallLogs('All Numbers')}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: -hp(0.2),
                  zIndex: Platform.OS == 'ios' ? -1 : 0,
                  //backgroundColor: 'red',
                }}
                sections={isCallLogs}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, section, index}) => {
                  return (
                    <Item title={item} index={index} section={section} />
                    //<Text>{index}</Text>
                  );
                }}
                renderSectionHeader={({section: {title}}) => (
                  <Text style={styles.header}>
                    {/* {moment(title).format('DD/MM/YYYY')} */}
                    {title}
                  </Text>
                )}
              />
            )}
          </>
        )}

        {/* ========================== END ============================== */}
        {/* <View style={{marginBottom: hp(5.5)}}>
          <FloatingAction
            backgroundColor="red"
            floatingIcon={<Dilar />}
            //onPressMain={() => sizeSheet.current.open()}
          />
        </View> */}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setIsString('');
            sizeSheet.current.open();
            setOpen(false);
          }}
          style={styles.actionStyle}>
          <LinearGradient
            colors={['#6FB3FF', '#7F5AFF']}
            start={{y: 0.0, x: 0.0}}
            style={styles.actionBtnStyle}
            end={{y: 0.0, x: 1.0}}>
            <Dilar />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ======================= Dailer Component =========================== */}

      <RBSheet
        ref={sizeSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={hp(65)}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 1,
          },
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: wp(8),
            marginTop: hp(5),
          }}>
          <Text
            style={{
              ...styles.dailerTextStyle,
              fontSize: isString.length > 13 ? wp(8.5) : wp(9),
            }}>
            {isString}
          </Text>

          <View style={styles.keyRowStyle}>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('1')}>
              <Text style={styles.numStyle}>1</Text>
              <One alignSelf="center" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('2')}>
              <Text style={styles.numStyle}>2</Text>
              <Text style={styles.alpaStyle}>ABC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('3')}>
              <Text style={styles.numStyle}>3</Text>
              <Text style={styles.alpaStyle}>DEF</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyRowStyle}>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('4')}>
              <Text style={styles.numStyle}>4</Text>
              <Text style={styles.alpaStyle}>GHI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('5')}>
              <Text style={styles.numStyle}>5</Text>
              <Text style={styles.alpaStyle}>JKL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('6')}>
              <Text style={styles.numStyle}>6</Text>
              <Text style={styles.alpaStyle}>MNO</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyRowStyle}>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('7')}>
              <Text style={styles.numStyle}>7</Text>
              <Text style={styles.alpaStyle}>PQRS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('8')}>
              <Text style={styles.numStyle}>8</Text>
              <Text style={styles.alpaStyle}>YUV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('9')}>
              <Text style={styles.numStyle}>9</Text>
              <Text style={styles.alpaStyle}>WXYZ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyRowStyle}>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('*')}>
              <Text style={styles.numStyle}>*</Text>
              <Text style={styles.alpaStyle}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('0')}
              onLongPress={() => concatinate('+')}>
              <Text style={styles.numStyle}>0</Text>
              <Text style={styles.alpaStyle}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.KeyStyle}
              onPress={() => concatinate('#')}>
              <Text style={styles.numStyle}>#</Text>
              <Text style={styles.alpaStyle}></Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              //backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: wp(7),
            }}>
            <TouchableOpacity
            // onPress={() =>
            //   props.navigation.navigate('Chat', {
            //     Number: isString,
            //     ThreadId: null,
            //   })
            >
              {/* <BlueIcon /> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: wp(4)}}
              onPress={() => {
                if (isString.length >= 10) {
                  sizeSheet.current.close();
                  setTimeout(() => {
                    if (value == null || value == 'All Numbers') {
                      setIsPopUp(true);
                    } else {
                      call(value);
                    }
                  }, 200);
                } else {
                  Toast.show('Number is not valid', Toast.SHORT, [
                    'UIAlertController',
                  ]);
                }
              }}>
              {/* onPress={() => sizeSheet.current.close()}> */}
              <PhoneBtn />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => concatinate('del')}
              onLongPress={() => setIsString('')}>
              <Cross />
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* ============================== END ================================ */}
    </ImageBackground>
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
    fontFamily: fonts.regular,
    fontSize: wp(4),
    color: '#B0B0B0',
    marginTop: hp(2),
    marginBottom: hp(2),
    marginHorizontal: wp(12),
  },

  tileStyle: {
    alignSelf: 'center',
    color: '#2E2E2E',
    fontFamily: fonts.regular,
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
    fontFamily: fonts.regular,
    fontSize: hp(1.5),
    opacity: 0.2,
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
  dailerTextStyle: {
    height: hp(8),
    textAlign: 'right',
    color: 'black',
    fontFamily: fonts.regular,

    fontWeight: '400',
    marginHorizontal: wp(4),
  },
  KeyStyle: {
    height: hp(8),
  },
  numStyle: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: wp(10),
    fontWeight: '400',
    textAlign: 'center',
    width: wp(20),
  },
  alpaStyle: {
    color: '#8C8C8C',
    fontFamily: fonts.regular,
    fontSize: wp(3),
    marginTop: hp(-1),
    textAlign: 'center',
  },
  keyRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  actionStyle: {
    height: hp(8),
    width: wp(20),
    alignSelf: 'flex-end',
    bottom: hp(8),
    marginRight: wp(5),
  },
  actionBtnStyle: {
    borderRadius: hp(7),
    height: hp(7),
    width: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  calanderBtnStyle: {
    backgroundColor: '#7F5AFF',
    padding: hp(1.5),
    borderRadius: hp(10),
    borderColor: 'white',
    borderWidth: 1,
    width: wp(50),
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? null : hp(3),
  },
  selectSim: {
    width: wp(80),
    borderRadius: wp(4),
    alignSelf: 'center',
  },
  selectSimTextStyle: {
    color: 'black',
    fontFamily: fonts.light,
    fontSize: wp(5),
  },
  renderNumberStyle: {
    color: 'black',
    fontFamily: fonts.light,
    fontSize: wp(4.5),
    marginVertical: hp(2),
    marginLeft: wp(5),
  },
  appHeaderMainView: {
    height: hp(15),
    flexDirection: 'row',
    marginHorizontal: wp(6),
    justifyContent: 'space-between',
  },
};

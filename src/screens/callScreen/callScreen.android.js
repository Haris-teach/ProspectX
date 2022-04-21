import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  Platform,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
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
import {GETPHONENUM, CALLLOGS, CALL_TOKEN_API} from '../../HitApis/Urls';
import {GetNumbers} from '../../redux/Actions/commonAction';
import AppHeader from '../../components/AppHeadercomponent/Appheader';

// =============================================

// ============SVG Imports===================
import Cross from '../../assets/svg/cross.svg';
import PhoneBtn from '../../assets/svg/phoneBtn.svg';
import BlueIcon from '../../assets/svg/blueicon.svg';
import One from '../../assets/svg/one.svg';
import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';
import INCall from '../../assets/svg/inCall.svg';
import OutCall from '../../assets/svg/outCall.svg';
import Dilar from '../../assets/svg/dilar';
import Call from '../../assets/svg/call.svg';
import Contact from '../../assets/svg/contact.svg';
import Contact2 from '../../assets/svg/c1.svg';
import uuid from 'uuid';
// =========================================

// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#usage)
const callKeepOptions = {
  ios: {
    appName: 'ProspecX',
    supportsVideo: false,
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

const identity = Platform.select({
  ios: 'Steve',
  android: 'Larry',
});

const CallScreen = props => {
  const [to, setTo] = useState('');
  const [callInProgress, setCallInProgress] = useState(false);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const sizeSheet = useRef();

  const token = useSelector(state => state.authReducer.token);

  const [items, setItems] = useState([
    {
      id: 0,
      label: 'All',
      value: 'All',
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
  const [isString, setIsString] = useState('');
  const [isPopUp, setIsPopUp] = useState(false);

  // ================== Render Section list function ==============
  const Item = ({title, index, section}) => {
    return (
      <>
        {title.to.split(':').length == 1 &&
        title.from.split(':').length == 1 ? (
          <TouchableOpacity
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
    HitApi(GETPHONENUM, 'get', '', token).then(res => {
      let allNumbers = [];
      res.data.forEach(i => {
        allNumbers.push({
          id: i.id + 1,
          label: i.label.incoming_number,
          value: i.value.incoming_number,
        });
      });

      setItems(allNumbers);
      dispatch(GetNumbers(allNumbers));
    });
  };
  useEffect(() => {
    GetAllNumbers();
  }, []);
  // ============================== END  =================================

  // ============== Get all call logs =============================
  const GetCallLogs = pageVal => {
    setIsLoading(true);

    let params = {
      filters: {
        numbers: pageVal === 'All' ? [] : [pageVal],
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
        return null;
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      GetCallLogs('All');
    }, 3000);
  }, [isFocused]);
  // =================== END =====================================

  // ================ Concatinate string function ================

  const concatinate = v => {
    let word = isString;

    if (v == 'del') {
      word = word.slice(0, -1);
      setIsString(word);
      return;
    } else {
      if (word.length < 13) {
        word = word + v;
        setIsString(word);
      }
    }
  };
  // ========================= END =========================

  const fetchAccessToken = async () => {
    const accessToken = await HitApi(CALL_TOKEN_API, 'get', '', token);
    return accessToken.data.token;
  };
  //==================== Call functions ==========================
  const twilioToken = useSelector(state => state.commonReducer.twilioToken);
  useEffect(() => {
    RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);
  }, []);

  useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener(EventType.CallConnected, () => {
        setCallInProgress(true);
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnected, () => {
        setCallInProgress(RNTwilioPhone.calls.length > 0);
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnectedError, data => {
        setCallInProgress(RNTwilioPhone.calls.length > 0);
      }),
    ];

    return () => {
      subscriptions.map(subscription => {
        subscription.remove();
      });
    };
  }, []);

  function hangup() {
    RNCallKeep.endAllCalls();
  }

  const getNewUuid = () => uuid.v4().toLowerCase();
  async function call(fromNum) {
    if (isString === '') {
      return;
    }

    setCallInProgress(true);

    try {
      if (Platform.OS === 'android') {
        RNTwilioPhone.startCall(isString, isString, fromNum);
        setIsPopUp(false);
      } else {
        const callUUID = getNewUuid();
        RNTwilioPhone.startCall(isString);
      }
    } catch (e) {
      console.log(e);
      setCallInProgress(false);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      handleNotification(remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNotification = remoteMessage => {
    if (remoteMessage.data) {
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
            marginTop: Platform.OS === 'ios' ? hp(-2.3) : hp(-3),
            padding: hp(1.5),
            borderBottomRightRadius: hp(10),
            borderBottomLeftRadius: hp(10),
            borderColor: 'white',
            borderWidth: 1,
            width: wp(97.9),
            marginLeft: wp(-6),
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
          <Text style={styles.selectSimTextStyle}>
            Choose Number for this call
          </Text>
          <View style={{maxHeight: hp(25), marginTop: hp(2)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={items}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      call(item.value);
                    }}>
                    <Call alignSelf="center" width={wp(5)} height={hp(5)} />
                    <Text style={styles.renderNumberStyle}>{item.value}</Text>
                  </TouchableOpacity>
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
        {/* =========== Header PArt=========== */}

        <AppHeader
          leftonPress={() => props.navigation.navigate('Profile')}
          rightonPress={() => props.navigation.navigate('Notification')}
          leftIcon={<Menu />}
          rightIcon={<Bell />}
        />

        {/* ==================================== */}

        {/* ================DropDown component============== */}

        <RNDropDown
          open={open}
          placeholder="Select number for call"
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={value => {
            setIsLoading(true);
            GetCallLogs(value.value);
          }}
          onPress2={() => setIsVisible(true)}
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
                onRefresh={() => GetCallLogs('All')}
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
          onPress={() => sizeSheet.current.open()}
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
            //zIndex: -1,
          },
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: wp(8),
            marginTop: hp(5),
          }}>
          <Text style={styles.dailerTextStyle}>{isString}</Text>

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
                    setIsPopUp(true);
                  }, 200);
                } else {
                  Toast.show('Number is not valid', Toast.SHORT, [
                    'UIAlertController',
                  ]);
                }
              }}>
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
    fontSize: wp(9),
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
    maxheight: hp(35),
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
};

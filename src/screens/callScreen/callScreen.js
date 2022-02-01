import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  StatusBar,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging';

// ================local import=================
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import RNSearch from '../../components/RNSearch/RNSearch';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import HitApi from '../../HitApis/APIHandler';
import {GETPHONENUM, CALLLOGS} from '../../HitApis/Urls';
import {GetNumbers, GetTabLocation} from '../../redux/Actions/commonAction';
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
import Calendar from '../../assets/svg/calendar.svg';
import Contact from '../../assets/svg/contact.svg';
import Contact2 from '../../assets/svg/c1.svg';

import TwilioVoice from 'react-native-twilio-voice-sdk';
// import {RNTwilioPhone, twilioPhoneEmitter} from 'react-native-twilio-phone';
// const Device = require('@twilio/voice-sdk').Device;
import axios from 'axios';

// =========================================

const DATA = [
  {
    title: 'Today',
    data: ['John Wick', 'Lesnar', 'Adam'],
  },
  {
    title: 'Yesterday',
    data: ['Rock', 'Glod barg', 'Kane'],
  },
  {
    title: '14 December 2021',
    data: ['Roman', 'Ven Disal', 'Shawn Mical'],
  },
  {
    title: '13 December 2021',
    data: ['Coke', 'Anna White'],
  },
];

const CallScreen = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const sizeSheet = useRef();

  const token = useSelector(state => state.authReducer.token);

  const PhoneNumbers = useSelector(state => state.commonReducer.Numbers);

  const [items, setItems] = useState([
    {
      id: 0,
      label: 'All',
      value: 'All',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Set Time');
  const [isLoading, setIsLoading] = useState(false);

  const Item = ({title, index, section}) => {
    return (
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('InComming', {name: title})}
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

          //   borderTopWidth: index == 0 ? 1 : -10,
          //   borderLeftWidth: 1,
          //   borderRightWidth: 1,
          //   borderBottomWidth: index === section.data.length - 1 ? 1 : 0,

          //marginBottom: index == section.data.length - 1 ? hp(5) : hp(0),
        }}>
        <View style={styles.listStyle}>
          <View style={styles.miniContainer}>
            {title.dir != 'outbound-dial' ? (
              <INCall width={wp(4)} height={hp(4)} alignSelf="center" />
            ) : (
              <OutCall width={wp(4)} height={hp(4)} alignSelf="center" />
            )}

            <Text style={styles.tileStyle}>
              {title.dir == 'outbound-dial' ? title.to : title.from}
            </Text>
          </View>

          <Text style={styles.durationStyle}>
            {' '}
            {moment(title.time).format('h:mm A')}
          </Text>
        </View>

        {index < section.data.length - 1 ? (
          <View
            style={{borderWidth: 0.4, marginHorizontal: wp(10), opacity: 0.1}}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  // ============== GET all phone  numbers function ================

  const GetAllNumbers = () => {
    HitApi(GETPHONENUM, 'get', '', token).then(res => {
      res.data.forEach(i => {
        items.push({
          id: i.id + 1,
          label: i.label,
          value: i.value,
        });
        setItems(items);
      });
      dispatch(GetNumbers(items));
    });
  };

  useEffect(() => {
    GetAllNumbers();
  }, []);

  // ===============================================================

  // ============== Get all call logs =============================

  const [callLogs, setCallLogs] = useState([]);

  const GetCallLogs = () => {
    setIsLoading(true);
    let params = {
      filters: {
        numbers: ['+16232923707'],
      },
      pagination: {
        page_number: 1,
        page_size: 100,
      },
    };

    HitApi(CALLLOGS, 'post', params, token).then(res => {
      setIsLoading(false);
      if (res.status == 1) {
        var externalObj = {};
        var prevEndDate = null;
        var date = null;

        let call_logs = res.data.call_logs;

        call_logs.sort(function (a, b) {
          return new Date(b.startTime) - new Date(a.startTime);
        });

        // // Excluding all forwarding number call logs
        call_logs.map((logs, index) => {
          if (res.data.forwarding_numbers.includes(logs.to)) {
            call_logs.splice(index, 1);
          }
        });

        call_logs.forEach(i => {
          let currentEndDate = i.endTime;
          let obj = {
            title: currentEndDate,
            data: {
              dir: i.direction,
              direction: i.direction,
              to: i.to,
              from: i.from,
              time: i.endTime,
            },
          };
          if (
            !moment(prevEndDate)
              .startOf('day')
              .isSame(moment(currentEndDate).startOf('day'))
          ) {
            prevEndDate = currentEndDate;
            date = currentEndDate;
            externalObj[date] = [];
          }
          externalObj[date].push(obj);
        });
        let dataArr = [];
        for (const item in externalObj) {
          let obj = {
            title: item,
            data: externalObj[item].map(obj => {
              return obj.data;
            }),
          };

          dataArr.push(obj);
        }

        setCallLogs(dataArr);
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    GetCallLogs();
  }, [isFocused]);

  // =================== END =====================================

  // ================ Concatinate string function ================

  const [isString, setisString] = useState('');
  const concatinate = v => {
    let word = isString;

    if (v == 'del') {
      word = word.slice(0, -1);
      setisString(word);
      return;
    } else {
      if (word.length < 13) {
        word = word + v;
        setisString(word);
      }
    }
  };
  // ==================================================

  //==================== Call functions ==========================
  const twilioToken = useSelector(state => state.commonReducer.twilioToken);

  useEffect(() => {
    console.log('Version:   ', TwilioVoice.version);
    console.log('Native Version:  ', TwilioVoice.nativeVersion);
  }, []);

  //==================== END =====================================

  messaging().onNotificationOpenedApp(remoteMessage => {
    props.navigation.navigate('Home', {screen: 'Message'});
  });

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={images.splashBackground}>
      <View style={styles.mainContainer}>
        {/* ===========Header PArt=========== */}

        <AppHeader
          leftonPress={() => props.navigation.navigate('Profile')}
          rightonPress={() => props.navigation.navigate('Notification')}
          leftIcon={<Menu />}
          rightIcon={<Bell />}
        />

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
          svg2={<Contact2 />}
        />

        {/* ==================================================== */}

        {/* ===============LIST VIEW========================== */}

        <SectionList
          refreshing={isLoading}
          onRefresh={() => GetCallLogs()}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -hp(0.2),
            zIndex: Platform.OS == 'ios' ? -1 : 0,
            //backgroundColor: 'red',
          }}
          sections={callLogs}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section, index}) => {
            return (
              <Item title={item} index={index} section={section} />
              //<Text>{index}</Text>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>
              {moment(title).format('DD/MM/YYYY')}
            </Text>
          )}
        />

        {/* ======================================================== */}
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
        onClose={async () => {
          if (isString.length == 13) {
            let call = TwilioVoice.connect(twilioToken, {
              phoneNumber: isString,
              from_number: '+16017518490',
            });
            console.log('Call:   ', await call);
            props.navigation.replace('CallStart', {
              name: isString,
            });
          }
        }}
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
              <BlueIcon />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: wp(4)}}
              onPress={() => {
                if (isString.length == 13) {
                  sizeSheet.current.close();
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
              onLongPress={() => setisString('')}>
              <Cross />
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* ==================================================================== */}
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
};
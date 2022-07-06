import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import CalendarPicker from 'react-native-calendar-picker';
import {Dialog} from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';

// ================local import=================
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import HitApi from '../../HitApis/APIHandler';
import {MSGTHREADS, BASE_URL} from '../../HitApis/Urls';

import fonts from '../../assets/fonts/Fonts';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
// =============================================

// ============SVG Imports===================

import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';

import Contact from '../../assets/svg/contact.svg';
import Msg from '../../assets/svg/msgIcon.svg';
import Contact2 from '../../assets/svg/c1.svg';

// =========================================

const MsgScreen = props => {
  const isFocused = useIsFocused();

  const [items, setItems] = useState([
    {
      id: 0,
      label: 'All Numbers',
      value: 'All Numbers',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [msgData, setMsgData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isvisible, setIsVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const PhoneNumbers = useSelector(state => state.commonReducer.Numbers);
  const token = useSelector(state => state.authReducer.token);

  // ==============  web io for Chat thread call Listner ============

  useEffect(() => {
    var socket = io(BASE_URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            authorization: `Bearer ${token}`,
          },
        },
      },
    });

    socket.on('connect', function () {
      console.log('Connected to Server');
      socket.emit('subscribe', 'Creating the socket setting to user');
    });

    socket.on('receiveMessage', event => {
      setPage(1);
      MsgsThreads('All Numbers');
      setIsCheck(false);
    });
  }, []);

  // ============= END ==================

  // ============== GET all msgs threads function ================

  const MsgsThreads = pageVAl => {
    let params = {
      filters: {
        numbers: pageVAl === 'All Numbers' ? [] : [pageVAl],
        date: {
          start_date: startDate,
          end_date: endDate,
        },
      },
      pagination: {
        page_number: page,
        page_size: 70,
      },
    };
    // setIsLoading(true);
    HitApi(MSGTHREADS, 'POST', params, token)
      .then(res => {
        if (res.status == 1) {
          if (page == 1) {
            setMsgData(res.data);
            setStartDate('');
            setEndDate('');
          } else {
            setMsgData([...msgData, ...res.data]);
            setStartDate('');
            setEndDate('');
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setStartDate('');
          setEndDate('');
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull', Toast.SHORT, [
          'UIAlertController',
        ]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setValue(null);
    MsgsThreads('All Numbers');
    setOpen(false);
  }, [isFocused]);

  const LoadMoreData = () => {
    if (msgData.length > 9) {
      setPage(page + 1);

      MsgsThreads(value);
    }
  };

  // ============= END ========================

  const renderItem = ({item, index}) => {
    let Split = moment(item.latesttime).format('DD/MM/YYYY');

    let number = PhoneNumbers.includes(item.first) ? item.first : item.second;

    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.item}
          onPress={() => {
            setOpen(false);
            props.navigation.navigate('Chat', {
              Number: PhoneNumbers.includes(item.first)
                ? item.second
                : item.first,
              secondNumber: PhoneNumbers.includes(item.first)
                ? item.first
                : item.second,
              ThreadId: item.thread_id,
            });
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Msg height={hp(5)} width={wp(10)} />
            <View style={{flex: 1}}>
              <Text style={styles.nameStyle} numberOfLines={1}>
                {number}
              </Text>
              <Text style={styles.msgStyle} numberOfLines={2}>
                {item.message}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeStyle}>{Split}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.viewStyle} />
      </>
    );
  };

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
              // console.log('EndDate:  ', endDate);
              Toast.show('Please select end date');
            } else {
              setIsLoading(true);
              if (value == null) {
                setIsVisible(false);
                MsgsThreads('All Numbers');
              } else {
                setIsVisible(false);
                MsgsThreads(value);
              }
            }
          }}
          style={styles.calanderBtnStyle}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Done</Text>
        </TouchableOpacity>
      </Dialog>
    );
  };

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={images.splashBackground}>
      <View style={styles.mainContainer}>
        {RenderModal()}
        {/* ===========Header PArt=========== */}

        <AppHeader
          leftonPress={() => {
            setOpen(false);
            props.navigation.navigate('Profile');
          }}
          rightonPress={() => {
            setOpen(false);
            props.navigation.navigate('Notification');
          }}
          leftIcon={<Menu />}
          rightIcon={<Bell marginTop={hp(-0.5)} />}
        />

        {/* ==================================== */}

        {/* =============RNDropDown===================== */}

        <RNDropDown
          open={open}
          placeholder="Select From Number"
          value={value}
          items={PhoneNumbers}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={value => {
            setPage(1);
            setIsLoading(true);
            MsgsThreads(value.value);
          }}
          onPress2={() => {
            setOpen(false);
            setIsVisible(true);
          }}
          svg={<Contact />}
          svg2={<Contact2 />}
        />

        {/* =================================================== */}

        <View style={styles.flatListStyle}>
          {isLoading ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color="blue" />
            </View>
          ) : (
            <>
              {msgData.length == 0 ? (
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
                <FlatList
                  data={msgData}
                  renderItem={renderItem}
                  refreshing={isLoading}
                  onRefresh={() => MsgsThreads('All Numbers')}
                  keyExtractor={(item, index) => item.latesttime + index}
                  onEndReachedThreshold={0}
                  onEndReached={() => LoadMoreData()}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default MsgScreen;

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

    width: wp(74),
  },
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
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
  item: {
    marginHorizontal: wp(2),
    marginVertical: 8,
    marginHorizontal: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(3),
  },
  title: {
    fontSize: wp(10),
  },
  flatListStyle: {
    flex: 1,
    zIndex: Platform.OS == 'ios' ? -1 : 0,
    backgroundColor: 'rgba(255, 255, 255, 0.67)',

    marginHorizontal: wp(6.5),
    borderRadius: wp(5),
    marginTop: hp(2),
    borderColor: '#FFFFFF',
    marginBottom: hp(8),
  },
  nameStyle: {
    fontFamily: fonts.regular,
    color: '#2E2E2E',
    fontSize: wp(4.5),
    marginHorizontal: wp(3),
    marginTop: hp(-0.5),
  },
  msgStyle: {
    fontFamily: fonts.regular,
    color: '#959595',
    fontSize: wp(3.2),
    marginHorizontal: wp(3),
    marginTop: hp(0.5),
  },
  timeStyle: {
    fontFamily: fonts.regular,
    color: 'black',
    fontSize: wp(3),
    marginHorizontal: wp(3),
    marginTop: hp(-0.5),
  },
  viewStyle: {
    borderWidth: 0.5,
    marginHorizontal: wp(10),
    opacity: 0.05,
    marginTop: hp(-1),
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
  floatingActionStyle: {
    height: hp(8),
    width: wp(20),
    alignSelf: 'flex-end',
    bottom: hp(8),
    marginRight: wp(5),
  },
  floatingBtnStyle: {
    borderRadius: hp(7),
    height: hp(7),
    width: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
};

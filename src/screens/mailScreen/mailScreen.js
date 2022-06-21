import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Dialog} from 'react-native-simple-dialogs';

import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import images from '../../assets/images/Images';
import Bell from '../../assets/svg/bell.svg';
import Email from '../../assets/svg/email.svg';
// =============================================
// ============SVG Imports===================
import Menu from '../../assets/svg/menu.svg';
import Pen from '../../assets/svg/pen.svg';
import AppHeader from '../../components/AppHeadercomponent/Appheader';
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import HitApi from '../../HitApis/APIHandler';
import {GETEMAIL, GETEMAILTHREADS} from '../../HitApis/Urls';
import {GetEmails} from '../../redux/Actions/commonAction';

// =========================================

const MailScreen = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [items, setItems] = useState([
    {
      id: 0,
      label: 'All Mails',
      value: 'All Mails',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [page, setPage] = useState(1);
  const [emailData, setEmailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isvisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const renderItem = ({item}) => {
    let Split = moment(item.latesttime).format('DD/MM/YYYY');
    let receiverEmail = items.includes(item.first) ? item.second : item.first;
    let senderEmail = items.includes(item.first) ? item.first : item.second;

    let time = Split.split(':');
    let name = receiverEmail.split('@');
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.item}
          onPress={() => {
            setOpen(false);
            props.navigation.navigate('MailIndox', {
              email: senderEmail,
              name: name[0],
              msg: item.email_body,
              first: senderEmail,
              second: receiverEmail,
            });
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Email height={hp(5)} width={wp(10)} />
            <View style={{flex: 1}}>
              <Text style={styles.nameStyle} numberOfLines={1}>
                {name[0]}
              </Text>
              <Text style={styles.msgStyle} numberOfLines={2}>
                {item.email_body}
              </Text>
            </View>
          </View>
          <Text style={styles.timeStyle}>{time}</Text>
        </TouchableOpacity>
        <View style={styles.viewStyle} />
      </>
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    HitApi(GETEMAIL, 'get', '', token)
      .then(res => {
        if (res.status == 1) {
          res.data.forEach((element, index) => {
            const obj = {id: index + 1, label: element, value: element};
            items.push(obj);
            setItems(items);
          });
          console.log(items);
          dispatch(GetEmails(items));
        } else {
          setItems([]);
        }
      })
      .catch(e => {
        Toast.show('Resquest is not successfull', Toast.SHORT, [
          'UIAlertController',
        ]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setValue(null);
    setOpen(false);
    GetEmailThreads('All Mails');
  }, [isFocused]);

  const GetEmailThreads = pageVAl => {
    let params = {
      filters: {
        emails: pageVAl === 'All Mails' ? [] : [pageVAl],
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

    HitApi(GETEMAILTHREADS, 'post', params, token).then(res => {
      if (res.status == 1) {
        setEmailData(res.data);
        setStartDate('');
        setEndDate('');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setStartDate('');
        setEndDate('');
      }
    });
  };
  // console.log('start date:    ', startDate, 'end date:', endDate);
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
              // console.log('EndDate:  ', endDate);
              Toast.show('Please select end date');
            } else {
              setIsLoading(true);
              if (value == null) {
                setIsVisible(false);
                GetEmailThreads('All Mails');
              } else {
                setIsVisible(false);
                GetEmailThreads(value);
              }
            }
          }}
          style={styles.calanderBtnStyle}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Done</Text>
        </TouchableOpacity>
      </Dialog>
    );
  };

  const location = useSelector(state => state.notPresistReducer.location);

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
          placeholder="Select From Email"
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={value => {
            setPage(1);
            setIsLoading(true);
            GetEmailThreads(value.value);
          }}
          onPress2={() => {
            setOpen(false);
            setIsVisible(true);
          }}
          svg={<Email />}
          svg2={<Email />}
        />

        {/* =================================================== */}

        <View style={styles.flatListStyle}>
          {isLoading ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color="blue" />
            </View>
          ) : (
            <>
              {emailData.length == 0 ? (
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
                  data={emailData}
                  refreshing={isLoading}
                  showsVerticalScrollIndicator={false}
                  onRefresh={() => GetEmailThreads('All Mails')}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item.latesttime + index}
                />
              )}
            </>
          )}
        </View>
      </View>
      {/* <View style={{marginBottom: hp(7)}}>
        <FloatingAction
          backgroundColor="red"
          floatingIcon={<Pen />}
          onPressMain={() => props.navigation.navigate('NewMailScreen')}
        />
      </View> */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setOpen(false);
          props.navigation.navigate('NewMailScreen', {msg: '', subject: ''});
        }}
        style={styles.floatingActionStyle}>
        <LinearGradient
          colors={['#6FB3FF', '#7F5AFF']}
          start={{y: 0.0, x: 0.0}}
          style={styles.floatingBtnStyle}
          end={{y: 0.0, x: 1.0}}>
          <Pen />
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default MailScreen;

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
    //backgroundColor: 'red',
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
    opacity: 0.1,
    borderColor: 'gray',
    marginTop: hp(-1),
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
};

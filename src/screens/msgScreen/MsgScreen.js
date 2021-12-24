import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

// ================local import=================
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import HitApi from '../../HitApis/APIHandler';
import {MSGTHREADS} from '../../HitApis/Urls';
// =============================================

// ============SVG Imports===================

import Menu from '../../assets/svg/menu.svg';
import Bell from '../../assets/svg/bell.svg';
import Pen from '../../assets/svg/pen.svg';
import Dilar from '../../assets/svg/dilar';
import Contact from '../../assets/svg/contact.svg';
import Msg from '../../assets/svg/msgIcon.svg';
import Contact2 from '../../assets/svg/c1.svg';
import axios from 'axios';
// =========================================

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Haris',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '47 min ago',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Hassan',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '1  hours ago',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Arfat',
    msg: 'Thank oe. i’m pleased you to see the benifits.Thank you.',
    time: '3 Days ago',
  },
];

const MsgScreen = props => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [msgData, setMsgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const PhoneNumbers = useSelector(state => state.commonReducer.Numbers);
  const token = useSelector(state => state.authReducer.token);

  // ============== GET all msgs threads function ================

  const MsgsThreads = () => {
    let params = {
      filters: {
        numbers: value,
      },
    };

    HitApi(MSGTHREADS, 'POST', params, token).then(res => {
      if (res.status == 1) {
        // setMsgData(res.data);
        let result = [];
        //let messages = res.data;
        let threads = res.data;
        for (let threadId in threads) {
          let index = threads[threadId].length - 1;
          let threadObj = {
            lastMessageTimeStamp: threads[threadId][index].timestamp,
            LastMessage: threads[threadId][index].message,
            Phone: threads[threadId][index].second,
            Name: 'Dummy Name',
            Thread: threads[threadId],
            ThreadId: threads[threadId][index].thread_id,
          };

          result.push(threadObj);
        }
        setMsgData(result);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      MsgsThreads();
    }
    return () => {
      mounted = false;
    };
  }, [value]);
  // ============= END ========================

  const renderItem = ({item}) => {
    let Split = moment(item.lastMessageTimeStamp).format('HH:mm:ss');
    //console.log(Split.split(':').length);
    let time = Split.split(':');
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            props.navigation.navigate('Chat', {
              Thread: item.Thread,
              Number: item.Phone,
              ThreadId: item.ThreadId,
            })
          }>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Msg height={hp(5)} width={wp(10)} />
            <View style={{flex: 1}}>
              <Text style={styles.nameStyle}>{item.Phone}</Text>
              <Text style={styles.msgStyle} numberOfLines={2}>
                {item.LastMessage}
              </Text>
            </View>
          </View>
          <Text style={styles.timeStyle}>{Split}</Text>
        </TouchableOpacity>
        <View style={styles.viewStyle} />
      </>
    );
  };

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={images.splashBackground}>
      <View style={styles.mainContainer}>
        {/* ===========Header PArt=========== */}

        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}>
            <Menu />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notification')}>
            <Bell />
          </TouchableOpacity>
        </View>

        {/* ==================================== */}

        {/* =============RNDropDown===================== */}

        <RNDropDown
          open={open}
          placeholder="Select number for call"
          value={value}
          items={PhoneNumbers}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={() => console.log('Pressed')}
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
            <FlatList
              data={msgData}
              renderItem={renderItem}
              keyExtractor={item => item.lastMessageTimeStamp}
            />
          )}
        </View>
      </View>
      {/* <View style={{marginBottom: hp(7)}}>
        <FloatingAction
          floatingIcon={<Pen />}
          //onPressMain={() => props.navigation.navigate('Chat')}
          overlayColor="red"
        />
      </View> */}
      <TouchableOpacity
        disabled
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('Chat', {Thread: []})}
        style={{
          height: hp(8),
          width: wp(20),
          alignSelf: 'flex-end',
          bottom: hp(8),
          marginRight: wp(5),
        }}>
        {/* <LinearGradient
          colors={['#6FB3FF', '#7F5AFF']}
          start={{y: 0.0, x: 0.0}}
          style={{
            borderRadius: hp(7),
            height: hp(7),
            width: hp(7),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          end={{y: 0.0, x: 1.0}}>
          <Pen />
        </LinearGradient> */}
      </TouchableOpacity>
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
    fontFamily: 'SF Pro Text',
    fontSize: wp(4),
    color: '#B0B0B0',
    marginTop: hp(2),
    marginBottom: hp(2),
    marginHorizontal: wp(12),
  },

  tileStyle: {
    alignSelf: 'center',
    color: '#2E2E2E',
    fontFamily: 'SF Pro Text',
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
    fontFamily: 'SF Pro Text',
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
    //backgroundColor: 'red',
    marginHorizontal: wp(6.5),
    borderRadius: wp(5),
    marginTop: hp(2),
    borderColor: '#FFFFFF',
  },
  nameStyle: {
    fontFamily: 'SF Pro Text',
    color: '#2E2E2E',
    fontSize: wp(4.5),
    marginHorizontal: wp(3),
    marginTop: hp(-0.5),
  },
  msgStyle: {
    fontFamily: 'SF Pro Text',
    color: '#959595',
    fontSize: wp(3.2),
    marginHorizontal: wp(3),
    marginTop: hp(0.5),
  },
  timeStyle: {
    fontFamily: 'Barlow-Light',
    color: '#959595',
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
};

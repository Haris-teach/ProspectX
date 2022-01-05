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
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';

// ================local import=================
import RNDropDown from '../../components/RNDropDown/RnDropDown';
import RNSearch from '../../components/RNSearch/RNSearch';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import HitApi from '../../HitApis/APIHandler';
import {GETPHONENUM} from '../../HitApis/Urls';
import {GetNumbers} from '../../redux/Actions/commonAction';

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

  const Item = ({title, index, section}) => {
    // console.log(
    //   'FADFAFASF:   ',
    //   section.data.length,
    //   index,
    //   DATA.length,
    //   title,
    // );
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('InComming', {name: title})}
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
            {index % 2 == 0 ? (
              <INCall width={wp(4)} height={hp(4)} alignSelf="center" />
            ) : (
              <OutCall width={wp(4)} height={hp(4)} alignSelf="center" />
            )}

            <Text style={styles.tileStyle}>{title}</Text>
          </View>

          <Text style={styles.durationStyle}>few min ago</Text>
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
    let mounted = true;
    if (mounted) {
      GetAllNumbers();
    }
    return () => {
      mounted = false;
    };
  }, []);

  // ===============================================================

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
      }
    }
    setisString(word);
  };
  // ==================================================
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
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -hp(0.2),
            zIndex: Platform.OS == 'ios' ? -1 : 0,
            //backgroundColor: 'red',
          }}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section, index}) => (
            <Item title={item} index={index} section={section} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
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
          style={{
            height: hp(8),
            width: wp(20),
            alignSelf: 'flex-end',
            bottom: hp(8),
            marginRight: wp(5),
            //justifyContent: 'flex-end',
            //alignItems: 'flex-end',
            //backgroundColor: 'red',
          }}>
          <LinearGradient
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
            marginHorizontal: wp(10),
            marginTop: hp(5),
          }}>
          <TextInput
            style={styles.dailerTextStyle}
            value={isString}
            editable={false}
            maxLength={13}
          />
          {/* {isString}
          </Text> */}

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
            <TouchableOpacity>
              <BlueIcon />
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: wp(4)}}>
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
  dailerTextStyle: {
    height: hp(8),
    textAlign: 'right',
    color: 'black',
    fontFamily: 'SF Pro Text',
    fontSize: wp(9),
    fontWeight: '400',
    marginHorizontal: wp(6),
  },
  KeyStyle: {
    height: hp(8),
  },
  numStyle: {
    color: 'black',
    fontFamily: 'SF Pro Text',
    fontSize: wp(10),
    fontWeight: '400',
    textAlign: 'center',
    width: wp(20),
  },
  alpaStyle: {
    color: '#8C8C8C',
    fontFamily: 'SF Pro Text',
    fontSize: wp(3),
    marginTop: hp(-1),
    textAlign: 'center',
  },
  keyRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
};

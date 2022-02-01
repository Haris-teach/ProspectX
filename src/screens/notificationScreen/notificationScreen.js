//========================================= React Native Import Files ============================

import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {useDispatch} from 'react-redux';

//======================================== Local Import Files ====================================
import images from '../../assets/images/Images';
import Clock from '../../assets/svg/clock.svg';
import Calander from '../../assets/svg/calan.svg';
import colors from '../../assets/colors/Colors';
import BackArrow from '../../assets/images/backarrow.svg';
import HitApi from '../../HitApis/APIHandler';
import {GETALLNOTIFICATION} from '../../HitApis/Urls';
import {useSelector} from 'react-redux';
import fonts from '../../assets/fonts/Fonts';
import {GetNotiNumber} from '../../redux/Actions/commonAction';

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

const NotificationScreen = props => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    viewContainer: {
      width: hp(1),
      height: hp(1),
      borderRadius: hp(2),
      alignSelf: 'center',
    },
    boldTextStyle: {
      marginLeft: wp(4),
      marginRight: wp(10),
      color: '#293859',
      fontWeight: 'bold',
      fontSize: wp(4),
    },
    msgStyle: {
      alignSelf: 'center',
      marginLeft: wp(5),
      fontFamily: fonts.regular,
      fontSize: wp(4),
      width: wp(60),
      textAlign: 'left',
      color: '#505372',
    },
    miniContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: wp(3),
      borderColor: 'white',
    },
    timeStyle: {
      marginHorizontal: wp(1),
      alignSelf: 'center',
      color: '#7681FF',
      fontSize: wp(3.4),
      marginVertical: hp(0.3),
    },

    flatListStyle: {
      flex: 1,
      marginTop: hp(4),
      marginBottom: hp(2),
      marginHorizontal: wp(6),
    },
  };

  const renderItem = ({item, index}) => {
    let number = item.message.split(' ');

    return (
      <TouchableOpacity
        onPress={() => setSelect(index)}
        style={{
          backgroundColor: select == index ? 'rgba(255, 255, 255, 0.62)' : null,
          borderRadius: wp(5),
          borderColor: 'white',
          borderWidth: select == index ? 1 : -1,
          padding: hp(2),
        }}>
        <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
          <View
            style={[
              styles.viewContainer,
              {backgroundColor: select == index ? null : '#7681FF'},
            ]}
          />
          <Text
            style={select == index ? styles.msgStyle : styles.boldTextStyle}
            numberOfLines={select == index ? 4 : 1}>
            {number[2]}
            <Text style={styles.msgStyle} numberOfLines={4}>
              {'  '}
              {item.message}
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.miniContainer,
              {
                marginLeft: wp(6),

                backgroundColor:
                  select == index ? '#E9EAFF' : 'rgba(255, 255, 255, 0.67)',
                borderWidth: select == index ? 1 : -1,
              },
            ]}>
            <Clock
              alignSelf="center"
              marginHorizontal={wp(0.5)}
              width={wp(3)}
              height={hp(2)}
            />
            <Text style={styles.timeStyle}>
              {moment(item.created_at).format('HH:mm')}
            </Text>
          </View>
          <View
            style={[
              styles.miniContainer,
              {
                marginLeft: wp(2),
                backgroundColor:
                  select == index ? '#E9EAFF' : 'rgba(255, 255, 255, 0.67)',
                borderWidth: select == index ? 1 : -1,
              },
            ]}>
            <Calander
              alignSelf="center"
              marginHorizontal={wp(0.5)}
              width={wp(3)}
              height={hp(2)}
            />
            <Text style={styles.timeStyle}>
              {moment(item.created_at).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        {select != index ? (
          <View
            style={{
              borderColor: '#6499FF',
              borderWidth: 0.5,
              marginTop: hp(3),
              opacity: 0.3,
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    GetNotifications();
  }, []);

  const GetNotifications = () => {
    // dispatch(GetNotification(0));
    let params = {
      query: {
        value: '%SMS%',
        fields: ['message'],
      },
    };
    HitApi(GETALLNOTIFICATION, 'POST', params, token).then(res => {
      if (res.status == 1) {
        setData(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <ImageBackground
      source={images.splashBackground}
      style={AllStyles.mainContainer}>
      {/* Header Code */}

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(GetNotiNumber(0));
            props.navigation.goBack();
          }}
          style={styles.backButton}>
          <BackArrow height={15} width={15} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      {/* -------------------------------------------------------------------------- */}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(0.5,0,0,0.5)',
          }}>
          <ActivityIndicator animating={true} color="blue" />
        </View>
      ) : (
        <View style={styles.flatListStyle}>
          {data.length == 0 ? (
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                marginBottom: hp(10),
              }}>
              <Text style={{alignSelf: 'center', color: 'black'}}>
                Record not found
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              refreshing={isLoading}
              onRefresh={() => GetNotifications()}
            />
          )}
        </View>
      )}
    </ImageBackground>
  );
};

export default NotificationScreen;

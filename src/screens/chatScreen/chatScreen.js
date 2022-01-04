//========================================= React Native Import Files ============================

import React, {useState, useEffect, useCallback} from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import moment, {now} from 'moment';
import Toast from 'react-native-simple-toast';
import io from 'socket.io-client';

//======================================== Local Import Files ====================================
import GradientButton from '../../components/gradientButton/Button';
import BackArrow from '../../assets/images/backarrow.svg';
import Fly from '../../assets/svg/fly.svg';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';
import HitApi from '../../HitApis/APIHandler';
import {
  SENDMESSAGE,
  GETMSGS,
  GETMSGSBYNUMBER,
  BASE_URL,
} from '../../HitApis/Urls';

const ChatScreen = props => {
  const PhoneNumbers = useSelector(state => state.commonReducer.Numbers);
  const token = useSelector(state => state.authReducer.token);
  const CurrentUserId = useSelector(state => parseInt(state.authReducer.id));

  const Number = props.route.params.Number;

  // const Number2 = props.route.params.Number2;

  const ThreadId = props.route.params.ThreadId;

  const [messages, setMessages] = useState([]);
  const [textMsg, setTextMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  // make connection with server from user side

  useEffect(() => {
    PhoneNumbers.forEach(i => {
      if (i.value == 'All') {
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

    setValue(PhoneNumbers[2].value);

    //console.log('first Phone number:   ', value, Number);
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
      console.log('Printing in Receive Message:  ', event.chatMessage);

      let temp = [];
      const {message, timestamp, sender_number, out, id} = event.chatMessage;

      let data = {
        _id: now(),
        text: message,
        createdAt: moment(timestamp),
        user: {
          _id: out == true ? CurrentUserId : 2,
          name: sender_number,
          avatar: null,
        },
      };
      temp.push(data);

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, temp),
      );
    });
  }, []);

  useEffect(() => {
    HitApi(`${GETMSGS}/${ThreadId}`, 'GET', '', token).then(res => {
      let msgs = [];
      res.data.forEach((msg, index) => {
        if (msg) {
          const {message, timestamp, second, out} = msg;
          let data = {
            _id: index,
            text: message,
            createdAt: moment(timestamp),
            user: {
              _id: out == true ? CurrentUserId : 2,
              name: second,
              avatar: null,
            },
          };
          msgs.push(data);
        }
      });
      let Data = msgs.sort(function compare(a, b) {
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setMessages(Data);
    });
  }, []);

  const MSGFliterByNumber = value => {
    let params = {
      to: Number,
      from: value,
    };
    HitApi(GETMSGSBYNUMBER, 'POST', params, token).then(res => {
      if (res.status == 1) {
        let msgs = [];
        res.data.forEach((msg, index) => {
          if (msg) {
            const {message, timestamp, second, out} = msg;
            let data = {
              _id: index,
              text: message,
              createdAt: moment(timestamp),
              user: {
                _id: out == true ? CurrentUserId : 2,
                name: second,
                avatar: null,
              },
            };
            msgs.push(data);
          }
        });
        let Data = msgs.sort(function compare(a, b) {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setMessages(Data);
      } else {
        Toast.showWithGravity(
          JSON.stringify(res.errors),
          Toast.SHORT,
          Toast.BOTTOM,
          setMessages([]),
        );
      }
    });
  };

  const messageSend = (message = []) => {
    setIsLoading(true);
    let params = {
      from: value,
      to: Number,
      message: message[0].text,
    };
    HitApi(SENDMESSAGE, 'POST', params, token).then(res => {
      if (res.status == 1) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, message),
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Toast.showWithGravity(
          JSON.stringify(res.errors),
          Toast.SHORT,
          Toast.BOTTOM,
        );
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
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}>
          <BackArrow height={15} width={15} />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>Change Password</Text> */}
      </View>
      {/* -------------------------------------------------------------------------- */}

      <DropDownPicker
        style={styles.dropdownStyle}
        props={{activeOpacity: 1}}
        open={open}
        placeholder="Select number for message"
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
        listItemLabelStyle={{color: 'black', fontSize: wp(4)}}
        containerStyle={styles.containerStyle}
        textStyle={{color: 'black', marginHorizontal: wp(3), fontSize: wp(4)}}
        labelStyle={{color: 'black'}}
        setValue={setValue}
        onChangeValue={value => MSGFliterByNumber(value)}
        setItems={setItems}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => messageSend(messages)}
        onInputTextChanged={text => setTextMsg(text)}
        user={{
          _id: CurrentUserId,
        }}
        placeholder="Write Message"
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                //backgroundColor: 'red',
                backgroundColor: 'rgba(255, 255, 255, 0.46)',
                marginHorizontal: wp(8),
                // marginBottom: hp(3),
                borderRadius: wp(10),
                // borderColor: 'white',
                // borderWidth: 1,
              }}
              renderSend={props => {
                return (
                  <LinearGradient
                    colors={['#6FB3FF', '#7F5AFF']}
                    style={{borderRadius: hp(7), marginRight: wp(-2)}}
                    start={{y: 0.0, x: 0.0}}
                    end={{y: 0.0, x: 1.0}}>
                    <Send
                      {...props}
                      containerStyle={{
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      {isLoading == false ? (
                        <Fly alignSelf="center" width={30} height={30} />
                      ) : (
                        <ActivityIndicator color="white" />
                      )}
                    </Send>
                  </LinearGradient>
                );
              }}
              textInputStyle={{
                color: 'black',
                //backgroundColor: 'red',
                marginLeft: wp(8),
                alignSelf: 'center',
                fontSize: wp(4.5),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(2),
                //textAlign: 'center',
              }}
            />
          );
        }}
        messagesContainerStyle={{
          marginHorizontal: wp(3),
          marginTop: hp(-2.5),
          //backgroundColor: 'red',
        }}
        renderAvatar={() => {
          return <View />;
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                  fontSize: wp(3.5),
                  fontFamily: fonts.regular,
                },
                left: {
                  color: '#293859',
                  fontSize: wp(3.5),
                  fontFamily: fonts.regular,
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderTopRightRadius: wp(5),
                  borderTopLeftRadius: wp(6),
                  borderBottomRightRadius: wp(5),
                  borderBottomLeftRadius: 0,
                  marginTop: hp(1),
                },
                right: {
                  paddingHorizontal: 10,
                  backgroundColor: colors.purpleColor,
                  borderTopRightRadius: wp(6),
                  borderTopLeftRadius: wp(5),
                  borderBottomLeftRadius: wp(5),
                  borderBottomRightRadius: 0,
                  marginTop: hp(1),
                },
              }}
            />
          );
        }}
        // inverted={true}
        // alignTop
        isTyping={true}
        // infiniteScroll
        alwaysShowSend={true}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        //scrollToBottom
        // isanimated={true}
        isKeyboardInternallyHandled={true}
        //scrollToBottomOffset={1}
      />
    </ImageBackground>
  );
};

export default ChatScreen;

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
  textStyle: {
    fontSize: wp(4.3),
    color: colors.titleColor,
    marginVertical: hp(6),
    // backgroundColor: 'red',
    marginHorizontal: wp(12),
  },
  dropdownStyle: {
    height: hp(6),

    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: wp(5),
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 1)',

    //justifyContent: 'center',
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
    //backgroundColor: 'yellow',
    width: wp(80),
    marginBottom: hp(10),
  },
  gradientStyle: {
    borderRadius: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.46)',
    alignSelf: 'center',
    width: wp(80),
    height: hp(7),
    marginTop: hp(-5),
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
  },
};

//========================================= React Native Import Files ============================

import React, {useState, useEffect, useCallback} from 'react';
import {
  ImageBackground,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllStyles from '../../all_styles/All_Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';

//======================================== Local Import Files ====================================
import GradientButton from '../../components/gradientButton/Button';
import BackArrow from '../../assets/images/backarrow.svg';
import Fly from '../../assets/svg/fly.svg';
import images from '../../assets/images/Images';
import colors from '../../assets/colors/Colors';
import fonts from '../../assets/fonts/Fonts';

const ChatScreen = props => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('Set Time');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      label: 'test1@gmail.com',
      value: 'test1@gmail.com',
    },
    {
      id: 1,
      label: 'test2@gmail.com',
      value: 'test2@gmail.com',
    },
    {
      id: 2,
      label: 'test3@gmail.com',
      value: 'test3@gmail.com',
    },
    {
      id: 3,
      label: 'test4@gmail.com',
      value: 'test4@gmail.com',
    },
  ]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const messageSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderInputToolbar = props => {
    console.log('PROPS:  ', props);
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.46)',
          alignSelf: 'center',
          marginHorizontal: wp(8),
          borderRadius: wp(8),
          borderWidth: 1,
          borderColor: 'white',
        }}
      />
    );
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
        listItemLabelStyle={{color: 'black'}}
        containerStyle={styles.containerStyle}
        textStyle={{color: 'black', marginHorizontal: wp(3)}}
        labelStyle={{color: 'black'}}
        setValue={setValue}
        setItems={setItems}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => messageSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                //backgroundColor: 'red',
                backgroundColor: 'rgba(255, 255, 255, 0.46)',
                marginHorizontal: wp(8),
                marginBottom: hp(5),
                borderRadius: wp(10),
                //borderColor: 'white',
                //borderWidth: 1,
              }}
              renderSend={props => {
                return (
                  <LinearGradient
                    colors={['#6FB3FF', '#7F5AFF']}
                    style={styles.gradientStyle}
                    start={{y: 0.0, x: 0.0}}
                    end={{y: 0.0, x: 1.0}}>
                    <Send
                      {...props}
                      containerStyle={{
                        width: hp(7),
                        height: hp(7),
                        borderRadius: hp(7),
                        //backgroundColor: 'yellow',
                      }}>
                      <Fly alignSelf="center" />
                    </Send>
                  </LinearGradient>
                );
              }}
              textInputStyle={{color: 'black'}}
            />
          );
        }}
        messagesContainerStyle={{
          marginHorizontal: wp(3),
          marginTop: hp(-5.5),
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
                  fontSize: 12,
                  fontFamily: fonts.regular,
                },
                left: {
                  color: '#293859',
                  fontSize: 12,
                  fontFamily: fonts.regular,
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 0,
                },
                right: {
                  paddingHorizontal: 10,
                  backgroundColor: colors.purpleColor,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 0,
                },
              }}
            />
          );
        }}
        // inverted={true}
        // alignTop
        infiniteScroll
        alwaysShowSend={true}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        scrollToBottom
        isanimated={true}
        isKeyboardInternallyHandled={true}
        scrollToBottomOffset={50}
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
    height: hp(3.5),
    width: wp(7.7),
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
    borderRadius: wp(10),
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
    borderRadius: hp(7.5),
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

//======================================= React Native Import Files ==============================
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

//======================================= Local Import Files ======================================
import AllStyles from '../../all_styles/All_Styles';
const AppHeader = props => {
  const Notifi = useSelector(state => state.commonReducer.notiNumber);
  useEffect(() => {
    console.log('Chl gia');
  }, [Notifi]);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.leftonPress}>
        {props.leftIcon}
      </TouchableOpacity>
      <TouchableOpacity onPress={props.rightonPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {props.rightIcon}
          {Notifi != 0 ? (
            <View style={styles.circleStyle}>
              {/* <Text style={styles.textStyle}>{Notifi}</Text> */}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AppHeader;

const styles = {
  headerContainer: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5),
    marginBottom: hp(1.5),
    marginHorizontal: wp(6),
  },
  circleStyle: {
    backgroundColor: 'red',
    width: wp(3),
    height: wp(3),
    borderRadius: wp(3),
    marginTop: hp(0),
    marginLeft: wp(-6),
    justifyContent: 'center',
  },
  textStyle: {color: 'white', alignSelf: 'center'},
};

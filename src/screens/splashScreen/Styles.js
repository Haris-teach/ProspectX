import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  iconViewStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(20),
  },
});
export default Styles;

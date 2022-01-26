import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = {
  mainContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: hp(1),
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#fff',
    minHeight: hp(12),
    padding: 5,
  },
  innerContainer: {
    flexGrow: 1,
  },
};
export default styles;

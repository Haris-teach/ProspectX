import { StyleSheet } from "react-native";
import { heightPercentageToDP  as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../assets/Colors/Colors";
const Styles = StyleSheet.create({
imageBackground:{
    // height:hp(100),
    flex:1
},
logoStyle:{
    height:hp(32),
    justifyContent:'center',
    alignItems:'center'
},
bottomContainer:{
    // flex:0.6,
    height:hp(60),
    paddingHorizontal:wp(5),
},
firstColumn:{
    justifyContent:'space-between',
    paddingVertical:hp(3),
    height:hp(14)
},

labelStyle:{
    alignSelf:'flex-start',
    paddingHorizontal:wp(4),
    // backgroundColor:'red',
    paddingVertical:hp(1),
    height:hp(3),
    color:colors.fieldtitleColor
},
inputRow:{
    flexDirection:'row',
    paddingHorizontal:wp(4),
    paddingVertical:hp(1.5),
    // height:hp(5),
    alignItems:'center',
    justifyContent:'space-between',
    width:wp(90),
    // backgroundColor:'red'
},
inputRowView:{
    justifyContent:'center',
    width:'100%',
    height:hp(5)
},
inputContainer:{
    backgroundColor:colors.whiteColor,
    shadowColor:'rgba(115, 98, 182, 0.08)',
    shadowOpacity:15,
    shadowRadius:20,
    // elevation:30,
    // elevation:200,
    height:hp(9),
    borderRadius:wp(5),
    justifyContent:'center',
},

forgotStyle:{
    color:colors.likeBlackColor,
    fontSize:12,
    fontWeight:'600'
},
signinStyle:{
    color:colors.titleColor,
    fontSize:28,
    // fontFamily:'SF-Pro-Text-Black'
},
enterEmailStyle:{
    color:colors.subtitleColor,
    fontSize:14
},
gradientView:{
    justifyContent:'flex-end',
    height:hp(18),
    shadowColor:'rgba(14, 34, 71, 0.26)',
    shadowOpacity:100,
    shadowRadius:200,
},
forgotView:{
    alignSelf:'center',
    justifyContent:'flex-end',
    height:hp(5)
},
inputViewStyle:{
    height:hp(20),
    // backgroundColor:'red',
    justifyContent:'space-between'
},
textFieldStyle:{
    fontSize:wp(4),
    flex:1,
    marginLeft:wp(3)
}
});

export default Styles
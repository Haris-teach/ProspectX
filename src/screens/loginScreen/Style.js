import { StyleSheet } from "react-native";
import { heightPercentageToDP  as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../assets/Colors/Colors";

const Styles = StyleSheet.create({
imageBackground:{
    flex:1
},
logoStyle:{
    height:hp(32),
    justifyContent:'center',
    alignItems:'center'
},
bottomContainer:{
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
    paddingVertical:hp(1.5),
    height:hp(3.9),
    color:colors.fieldtitleColor
},
inputRow:{
    flexDirection:'row',
    paddingHorizontal:wp(4),
    paddingVertical:hp(1.5),
    alignItems:'center',
    justifyContent:'space-between',
    width:wp(90),
},
inputRowView:{
    justifyContent:'center',
    width:'100%',
    height:hp(5)
},
inputContainer:{
    backgroundColor:colors.whiteColor,
    shadowColor:colors.viewShadowColor,
    // shadowOpacity:15,
    // shadowRadius:20,
    height:hp(9),
    borderRadius:wp(5),
    justifyContent:'center',
},

forgotStyle:{
    color:colors.likeBlackColor,
    fontSize:wp(3),
    fontWeight:'600'
},
signinStyle:{
    color:colors.titleColor,
    fontSize:wp(7.7),

},
enterEmailStyle:{
    color:colors.subtitleColor,
    fontSize:wp(4),
},
gradientView:{
    justifyContent:'flex-end',
    height:hp(18),
    shadowColor:colors.buttonShadowColor,
    // shadowOpacity:100,
    // shadowRadius:200,
},
forgotView:{
    alignSelf:'center',
    justifyContent:'flex-end',
    height:hp(5)
},
inputViewStyle:{
    height:hp(20),
    justifyContent:'space-between'
},
textFieldStyle:{
    fontSize:wp(4),
    flex:1,
    marginLeft:wp(3)
}
});

export default Styles
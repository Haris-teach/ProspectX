import { StyleSheet } from "react-native";
import { heightPercentageToDP  as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../assets/colors/Colors";
const Styles = StyleSheet.create({
imageBackground:{
    height:hp(100),
},
logoStyle:{
    height:hp(32),
    justifyContent:'center',
    alignItems:'center'
},
bottomContainer:{
    // flex:0.6,
    height:hp(6),
    paddingHorizontal:wp(5),
},
firstColumn:{
    // paddingHorizontal:wp(3),
    justifyContent:'space-between',
    paddingVertical:hp(3),
    // flex:0.14,
    height:hp(14)
},
// fieldView:{
//     paddingHorizontal:wp(3),
//     justifyContent:'space-between',
//     height:hp(4)
// },
labelStyle:{
    alignSelf:'flex-start',
    paddingHorizontal:wp(4),
    color:colors.fieldtitleColor
},
inputRow:{
    flexDirection:'row',
    paddingHorizontal:wp(4),
    paddingVertical:hp(0.5),
    justifyContent:'space-between',
    alignItems:'center',
    width:'90%'
},
inputRowView:{
    justifyContent:'flex-end',
    width:'100%',
    height:hp(4.5)
},
inputContainer:{
    backgroundColor:colors.whiteColor,
    height:hp(9),
    borderRadius:wp(5),
    justifyContent:'center',
},

forgotStyle:{
    color:colors.likeBlackColor,
    fontSize:12,
},
signinStyle:{
    color:colors.titleColor,
    fontSize:28
},
enterEmailStyle:{
    color:colors.subtitleColor,
    fontSize:14
},
gradientView:{
    justifyContent:'flex-end',
    height:hp(18)
},
forgotView:{
    alignSelf:'center',
    justifyContent:'flex-end',
    height:hp(5)
},
inputViewStyle:{
    height:hp(20),
    
    justifyContent:'space-between'
}
});

export default Styles
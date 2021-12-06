import { StyleSheet } from "react-native";
import { heightPercentageToDP  as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../assets/Colors/Colors";
import fonts from "../../assets/Fonts/Fonts";

const styles = StyleSheet.create({
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
    fontFamily:fonts.regular,
    fontWeight:'400',
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

forgotStyle:{
    color:colors.likeBlackColor,
    fontSize:wp(3),
    fontFamily:fonts.semiBold,
    fontWeight:'600'
},
signinStyle:{
    color:colors.titleColor,
    fontSize:wp(7.7),
    fontFamily:fonts.regular,
    fontWeight:'400'
},
enterEmailStyle:{
    color:colors.subtitleColor,
    fontSize:wp(4),
    fontFamily:fonts.regular,
    fontWeight:'400'
},
gradientView:{
    justifyContent:'flex-end',
    height:hp(18),
    shadowColor:'#0E2247',
        
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity:0.3,
        shadowRadius: 8,
        elevation: 10,
},
forgotView:{
    alignSelf:'center',
    justifyContent:'flex-end',
    height:hp(5)
},
inputViewStyle:{
    height:hp(22),
    justifyContent:'space-between',
    // backgroundColor:'red'
},
textFieldStyle:{
    fontSize:wp(4),
    flex:1,
    marginLeft:wp(3)
}
});

export default styles
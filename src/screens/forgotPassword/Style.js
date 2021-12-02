import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../assets/Colors/Colors";
import fonts from "../../assets/Fonts/Fonts";
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    inputViewStyle:{
        height:hp(20),
        paddingVertical:hp(2),
        justifyContent:'space-between',
    },
    headerView:{
        height:hp(20),
        justifyContent:'center',
        width:wp(90),
        alignSelf:'center'
    },
    backArrowWidth:{
        width:wp(10)
    },
    bottomView:{
        height:hp(30),
        width:wp(90),
        alignSelf:'center',
        justifyContent:'center',
        // backgroundColor:'yellow'
    },
    resendCodeStyle:{
        alignSelf:'center',
        paddingVertical:hp(3),
        fontFamily:fonts.regular,
        fontWeight:'600',
        fontSize:hp(1.5)
    },
    startView:{
        height:hp(50),
        width:wp(90),
        alignSelf:'center',
    },
    descTextView:{
        width:wp(80)
    },
    descTextStyle:{
        color:colors.titleColor,
        fontSize:wp(3.5),
        paddingVertical:hp(2),
        fontWeight:'400',
        fontFamily:fonts.regular
    },
    titleTextStyle:{
        color:colors.titleColor,
        fontSize:wp(7),
        fontFamily:fonts.regular,
        fontWeight:'400'
    },
    inputContainer:{
        backgroundColor:colors.whiteColor,
        shadowColor:colors.viewShadowColor,
        height:hp(10),
        borderRadius:wp(5),
        paddingHorizontal:wp(2),
        justifyContent:'center',
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
    textFieldStyle:{
        fontSize:wp(4),
        flex:1,
        marginLeft:wp(3)
    }

})
export default styles
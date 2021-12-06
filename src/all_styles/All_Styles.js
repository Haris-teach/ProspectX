
//======================================== React Native Import Files ======================================
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
//======================================= Local Import Files ===============================================
import colors from "../assets/Colors/Colors";
import fonts from "../assets/Fonts/Fonts";

const AllStyles = {
    splashBackgroundImage:{
        flex:1,
        justifyContent:'center'
       } ,
       splashIconViewStyle:{
        alignSelf:'center',
        justifyContent:'center'
       },
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
    resetInputRow:{
        flexDirection:'row',
        paddingHorizontal:wp(5),
        paddingVertical:hp(1.1),
        alignItems:'center',
        justifyContent:'space-between',
        width:wp(90),
    },
    inputRowView:{
        justifyContent:'center',
        width:'100%',
        height:hp(5)
    },
    loginInputContainer:{
        backgroundColor:'white',
        shadowColor:'#7362B6',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity:0.3,
        shadowRadius: 8,
        elevation: 10,
        height:hp(9),
        borderRadius:wp(5),
        justifyContent:'center',
    },
    
    forgotStyle:{
        color:colors.likeBlackColor,
        fontSize:wp(3),
        fontFamily:fonts.regular,
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
        shadowColor:colors.buttonShadowColor,
    },
    resetGradientView:{
        justifyContent:'flex-start',
        height:hp(18),
        width:wp(90),
        alignSelf:'center',
        shadowColor:'#0E2247',
        
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity:0.3,
        shadowRadius: 8,
        elevation: 10,
       
    },
    forgotGradientView:{
        justifyContent:'flex-end',
        height:hp(9),
        width:wp(90),
        alignSelf:'center',
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
    resetinputViewStyle:{
        height:hp(21),
        justifyContent:'space-between',
        
    },
    textFieldStyle:{
        fontSize:wp(4),
        flex:1,
        marginLeft:wp(3)
    },
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
    },
    incomingCallStartView:{
        flex:0.25,justifyContent:'flex-end'
    },
    incomingCallInnerView:{
        alignSelf:'center',justifyContent:'space-between',flex:0.45
    },
    incomingNumberStyle:{
        fontSize:wp(8)
    },
    incomingRingingStyle:{
        alignSelf:'center',fontSize:wp(6),fontFamily:fonts.regular,fontStyle:'normal'
    },
    incomingBottomStyle:{
        flex:0.8,justifyContent:'flex-end'
    },
    incomingSwipeBtnStyle:{
        flex:0.25,justifyContent:'flex-start',alignSelf:'center'
    }
}
export default AllStyles;



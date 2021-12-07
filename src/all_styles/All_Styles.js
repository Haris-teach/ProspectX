//======================================== React Native Import Files ======================================
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
//======================================= Local Import Files ===============================================
import colors from "../assets/Colors/Colors";
import fonts from "../assets/Fonts/Fonts";
const AllStyles = {
    splashBackgroundImage: {
        flex: 1,
        justifyContent: 'center'
    },
    splashIconViewStyle: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageBackground: {
        flex: 1
    },
    logoStyle: {
        height: hp(32),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        height: hp(60),
        paddingHorizontal: wp(5),
       
    },
    firstColumn: {
        justifyContent: 'space-between',
        paddingVertical: hp(3),
        height: hp(14)
    },
    labelStyle: {
        alignSelf: 'flex-start',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        height: hp(3.9),
        fontFamily: fonts.regular,
        fontWeight: '400',
        color: colors.fieldtitleColor
    },
    resetInputRow: {
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1.1),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(90),
    },
    inputRowView: {
        justifyContent: 'center',
        width: '100%',
        height: hp(5)
    },
    loginInputContainer: {
        backgroundColor: 'white',
        shadowColor: '#7362B6',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        height: hp(9),
        borderRadius: wp(5),
        justifyContent: 'center',
    },
    changePasswordComponentMainView:{
        backgroundColor: colors.profileRowBackgroundColor,
        shadowColor: '#7362B6',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        width:wp(90),
        alignSelf:'center',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        height: hp(7),
        borderColor:colors.whiteColor,
        borderWidth:1,
        borderRadius: wp(8),
        justifyContent: 'center',
    },
    forgotStyle: {
        color: colors.likeBlackColor,
        fontSize: wp(3),
        fontFamily: fonts.regular,
        fontWeight: '600'
    },
    signinStyle: {
        color: colors.titleColor,
        fontSize: wp(7.7),
        fontFamily: fonts.regular,
    },
    enterEmailStyle: {
        color: colors.subtitleColor,
        fontSize: wp(4),
        fontFamily: fonts.regular,
    },
    gradientView: {
        justifyContent: 'flex-end',
        height: hp(18),
        shadowColor: colors.buttonShadowColor,
    },
    resetGradientView: {
        justifyContent: 'flex-start',
        height: hp(18),
        width: wp(90),
        alignSelf: 'center',
        shadowColor: '#0E2247',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,

    },
    forgotGradientView: {
        justifyContent: 'flex-end',
        height: hp(9),
        width: wp(90),
        alignSelf: 'center',
        shadowColor: '#0E2247',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    forgotView: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        height: hp(5)
    },
    resetinputViewStyle: {
        height: hp(21),
        justifyContent: 'space-between',

    },
    textFieldStyle: {
        fontSize: wp(4),
        flex: 1,
        marginLeft: wp(3),
        fontFamily: fonts.medium
    },
    mainContainer: {
        flex: 1,
        
    },
    inputViewStyle: {
        height: hp(20),
        paddingVertical: hp(2),
        justifyContent: 'space-between',
    },
    headerView: {
        height: hp(20),
        justifyContent: 'center',
        width: wp(90),
        alignSelf: 'center'
    },
    backArrowWidth: {
        width: wp(10)
    },
    bottomView: {
        height: hp(30),
        width: wp(90),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    resendCodeStyle: {
        alignSelf: 'center',
        paddingVertical: hp(3),
        fontFamily: fonts.regular,
        fontWeight: '600',
        fontSize: hp(1.5)
    },
    startView: {
        height: hp(50),
        width: wp(90),
        alignSelf: 'center',
    },
    descTextView: {
        width: wp(80)
    },
    descTextStyle: {
        color: colors.titleColor,
        fontSize: wp(3.5),
        paddingVertical: hp(2),
        fontWeight: '400',
        fontFamily: fonts.regular
    },
    titleTextStyle: {
        color: colors.titleColor,
        fontSize: wp(7),
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    inputContainer: {
        backgroundColor: colors.whiteColor,
        shadowColor: colors.viewShadowColor,
        height: hp(10),
        borderRadius: wp(5),
        paddingHorizontal: wp(2),
        justifyContent: 'center',
    },
    labelStyle: {
        alignSelf: 'flex-start',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        height: hp(3.9),
        fontFamily: fonts.regular,
        fontWeight: '400',
        color: colors.fieldtitleColor
    },
    inputRow: {
        flexDirection: 'row',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(90),
    },
    textFieldStyle: {
        fontSize: wp(4),
        flex: 1,
        fontFamily: fonts.medium,
        marginLeft: wp(3)
    },
    incomingCallStartView: {
        flex: 0.25, 
        justifyContent: 'flex-end'
    },
    incomingCallInnerView: {
        alignSelf: 'center', 
        justifyContent: 'space-between', 
        flex: 0.45
    },
    incomingNumberStyle: {
        fontSize: wp(8),
        fontFamily: fonts.regular
    },
    incomingRingingStyle: {
        alignSelf: 'center', 
        fontSize: wp(6), 
        fontFamily: fonts.light,
    },
    incomingBottomStyle: {
        flex: 0.8, 
        justifyContent: 'flex-end'
    },
    callStartBottomView: {
        flex: 0.45,
        justifyContent: 'flex-end',
    },
    passwordEyeIconView:{
        height:hp(3.5),
        width:wp(7),
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    incomingSwipeBtnStyle: {
        flex: 0.25, 
        justifyContent: 'flex-start', 
        alignSelf: 'center', 
        alignItems: 'center',
    },
    swipeButtonTitleStyle:{
        fontFamily:fonts.regular,
        fontSize:wp(4)
    },
   callStartMuteStyle:{
        
    color:colors.lightGreyColor,
    fontSize:wp(3.5),
    textAlign:'center',
    fontFamily:fonts.regular,

   },
   callStartSpeakerStyle:{
    color:colors.lightGreyColor,
    fontSize:wp(3.5),
    textAlign:'center',
    fontFamily:fonts.regular
   },
    buttonTitleStyle:{
        height:hp(4),
        width: wp(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        alignSelf: 'center'
    },
    callStartButtonRow: {
        width: wp(45),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    startCallfirstColumn:{
        justifyContent:'space-between',
        height:hp(11.5),
    },
    startCallMikeView: {
        backgroundColor: colors.whiteColor, 
        height: hp(8), 
        width: hp(8), 
        borderRadius: hp(8), 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    },
    startCallSpeakerView: {
        backgroundColor: colors.whiteColor, 
        height: hp(8), 
        width: hp(8), 
        borderRadius: hp(8), 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    },
    startCallBottomView: {
        flex: 0.3, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    startCallDeclineButton: {
        height: hp(7), 
        width: hp(7), 
        justifyContent: 'center', 
        borderRadius: hp(7), 
        alignItems: 'center'
    },
    declineGradientButton:{
        borderRadius:wp(20)
    },
 profileFirstContainer:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center'
 },
 profileImageView:{
    backgroundColor:colors.whiteColor,
    height:120,
    width:120,
    borderRadius:wp(30),
    alignItems:'center',
    justifyContent:'center'
 },
 profileImageStyle:{
    height:95,
    width:95
 },
 appHeaderMainView:{
    height:hp(14),
    flexDirection:'row',
    paddingHorizontal:wp(5),
    alignItems:'flex-end',
    justifyContent:'space-between',
 },
 appHeaderRowView:{
    height:hp(6),
    width:wp(90),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
 },
 appHeaderTitleStyle:{
    color:colors.titleColor,fontSize:wp(5.5),fontFamily:fonts.regular
 },
 profileBottomContainer:{
    flex:0.7,
   
 },
 profileOptionsContainer:{
    flex:1,
    width:wp(90)
    ,alignSelf:'center',
    
    paddingVertical:hp(5),
    justifyContent:'flex-start'
 },
 profileComponentMainView:{
    backgroundColor:colors.profileRowBackgroundColor,
    height:hp(6),
    borderRadius:wp(10),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:wp(5),
    borderColor:colors.whiteColor,
    borderWidth:1
 },
 profileComponenticonView:{
    height:30,
    width:30,
    backgroundColor:'red',
    alignSelf:'center',
    borderRadius:wp(20)
 },
 profileComponentRowStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:wp(60)
 },
 profileComponentInnerRow:{
    flex:0.45,
    justifyContent:'space-between',
    alignContent:'center',
    width:wp(85),
    alignSelf:'center',
   
 },
 profileComponentTitleStyle:{
    color:colors.likeBlackColor,fontFamily:fonts.regular,fontSize:wp(3.5)
 },
 changepasswordMainView:{
    height:hp(60),
 },
 changePasswordHeadingView:{
    height:hp(14),alignItems:'center',justifyContent:'center',width:wp(90),
 },
 changePasswordDecStyle:{
    fontSize:wp(4.3),color:colors.titleColor,textAlign:'center'
 },
 changePasswordComponentView:{
    height:hp(28),justifyContent:'space-between',
 },
 changePasswordBottomView:{
    height:hp(45),
 },
 changePasswordButtonView:{
    height:hp(35),alignSelf:'center',width:wp(85),justifyContent:'flex-end',alignItems:'flex-end'
 }

  
}
export default AllStyles;



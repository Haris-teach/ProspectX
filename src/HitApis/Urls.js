//export const BASE_URL = 'https://569d-182-185-221-160.ngrok.io/'; // Staging URL
// export const BASE_URL = 'https://app.prospectx.com/'; //LIVE URL
export const BASE_URL = 'https://px2b.prospectx.com/'; // Staging URL
//export const PY_BASE_URL = 'https://app1.prospectx.com/'; // => live
export const PY_BASE_URL = 'https://px1b.prospectx.com/'; // = > staging

export const LOGIN = BASE_URL + 'api/v1/login';
export const SETTING = BASE_URL + 'api/v1/settings/notifications';
export const CHANGEPASS = BASE_URL + 'api/v1/profile/change-password';
export const GETPHONENUM = BASE_URL + 'api/v1/user/phone/numbers';
export const MSGTHREADS = BASE_URL + 'api/v1/user/message/threads';
export const GETMSGS = BASE_URL + 'api/v1/user/message/thread';
export const SENDMESSAGE = BASE_URL + 'api/v1/communication/send/message';
export const GETALLNOTIFICATION = BASE_URL + 'api/v1/notifications/search';
export const GETMSGSBYNUMBER = BASE_URL + 'api/v1/user/message/thread';
export const SENDEMAIL = BASE_URL + 'api/v1/communication/send/email';
export const GETEMAIL = BASE_URL + 'api/v1/user/mail/emails';
export const GETEMAILTHREADS = BASE_URL + 'api/v1/user/mail/threads';
export const GETALLEMAIL = BASE_URL + 'api/v1/user/mail/email_thread';
export const CALLLOGS = BASE_URL + 'api/v1/communication/call/logs';
export const GETOTP = BASE_URL + 'api/v1/forgot-password-otp';
export const OTPVERIFY = BASE_URL + 'api/v1/verify-otp';
export const PASSWORDREST = BASE_URL + 'api/v1/reset-password';
export const SENDNOTIFICATION =
  BASE_URL + 'api/v1/communication/firebase/send-notification';
export const ISSEENNOTIFICATION = BASE_URL + 'api/v1/my/notifications';
export const LOGOUT = BASE_URL + 'api/v1/logout/mobile';
export const CALL_TOKEN_API =
  BASE_URL + 'api/v1/commmunication/call/token?platform=' + Platform.OS;
export const CALL_DEDUCTION = PY_BASE_URL + 'crm/deduction_call_api';
export const CLOSE_ORDER = PY_BASE_URL + 'crm/close_order_api';
export const GET_EXTERNAL_ID = BASE_URL + 'api/v1/users';

const accountSid = 'ACca3781441647b3284a342782306c7dd4';
const authToken = '3a3195b27dde58fc3bc0a2e9c1925381';
const client = require('twilio')(accountSid, authToken);

// // client.messages
// //   .create({body: 'Hi there', from: '+17609653161', to: '+923044041082'})
// //   .then(message => console.log(message.sid));

// //   const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// client.api.calls
//   .create({
//     url: 'http://demo.twilio.com/docs/voice.xml',
//     to: '+17609653161',
//     from: '+923174011082',
//   })
//   .then(call => console.log(call.sid))
//   .catch(e => {
//     console.log('error:  ', e);
//   });

// client.calls
//   .list({limit: 20})
//   .then(calls => calls.forEach(c => console.log(c.sid)));

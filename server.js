const accountSid = 'ACca3781441647b3284a342782306c7dd4';
const authToken = 'a5f85e61bf02bc033f41e44b86f2f649';
const client = require('twilio')(accountSid, authToken);

// // client.messages
// //   .create({body: 'Hi there', from: '+17609653161', to: '+923044041082'})
// //   .then(message => console.log(message.sid));

// //   const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+923044041082',
    from: '+17609653161',
  })
  .then(call => console.log(call.sid));

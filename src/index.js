import request from 'request';
import config from '../config';

let sent = false;

const checkRA = async () => {
  try {
    console.log('Checking for tickets...');

    const page = await new Promise((resolve, reject) => {
      request({ uri: config.eventURL }, (err, resp, data) => {
        if (err) reject(err);
        resolve(resp);
      });
    });

    const available = page.body.indexOf('<li class="onsale') > -1;
    const clockwork = require('clockwork')({ key: config.clockworkToken });

    if (available) {
      for (let number of config.phoneNumbers) {
        clockwork.sendSms(
          {
            To: number,
            From: 'Jay',
            Content: `A ticket is available! ${config.eventURL}`,
          },
          function(error, resp) {
            if (error || !resp.responses[0].success) {
              console.log('Something went wrong', error, resp);
            } else {
              console.log(`Message sent to ${number}`, resp);
            }
          }
        );
      }
      sent = true;
    } else {
      console.log('No tickets available.');
    }
  } catch (err) {
    console.log(err);
  }
};

const interval = setInterval(() => {
  if (!sent) checkRA();
  else clearInterval(interval);
}, 30 * 1000);

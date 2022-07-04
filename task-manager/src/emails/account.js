
const mailgun = require("mailgun-js");

const api_key = '12370b55dcb2cb6f7bc0b29fafccd37c-1b8ced53-09bf6d8e';
const DOMAIN = 'sandbox75cc592c7e544eb9a58c366ccdbf4c4b.mailgun.org';

const mg = mailgun({apiKey: api_key, domain: DOMAIN});

const sendWelcomeEmail = (email, name) => {
  const data = {
    from: 'TaskManager! <me@samples.mailgun.org>',
    to: email,
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

const sendCancelEmail = (email, name) => {
  const data = {
    from: 'TaskManager! <me@samples.mailgun.org>',
    to: email,
    subject: 'You cancelled the account correctly!',
    text: `Hi, ${name}. Your account has been cancelled, nevertheless we want to know why did you chose so.`
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}
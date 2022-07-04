
const mailgun = require("mailgun-js");

const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

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